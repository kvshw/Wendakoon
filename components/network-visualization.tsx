"use client"

import { useRef, useMemo, useState, useEffect, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

const COUNT = 80
const CONNECT_DIST = 3.0
const MOUSE_RADIUS = 5
const PULSE_COUNT = 15
const BX = 16, BY = 11, BZ = 7
const REPEL_DIST = 1.8

const TEAL = [0.176, 0.831, 0.749]
const CYAN = [0.133, 0.827, 0.933]
const INDIGO = [0.38, 0.35, 0.95]

function lerpColor(a: number[], b: number[], t: number) {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]
}

const NODE_VERT = /* glsl */ `
attribute float aSize;
attribute float aAlpha;
attribute vec3 aColor;
varying float vAlpha;
varying vec3 vColor;
void main() {
  vAlpha = aAlpha;
  vColor = aColor;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = min(aSize * (80.0 / -mv.z), 12.0);
  gl_Position = projectionMatrix * mv;
}
`

const NODE_FRAG = /* glsl */ `
varying float vAlpha;
varying vec3 vColor;
void main() {
  float d = length(gl_PointCoord - vec2(0.5));
  if (d > 0.5) discard;
  float soft = smoothstep(0.5, 0.15, d);
  gl_FragColor = vec4(vColor, soft * vAlpha);
}
`

const PULSE_VERT = /* glsl */ `
attribute float aAlpha;
varying float vAlpha;
void main() {
  vAlpha = aAlpha;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_PointSize = min(2.5 * (80.0 / -mv.z), 6.0);
  gl_Position = projectionMatrix * mv;
}
`

const PULSE_FRAG = /* glsl */ `
varying float vAlpha;
void main() {
  float d = length(gl_PointCoord - vec2(0.5));
  if (d > 0.5) discard;
  float soft = smoothstep(0.5, 0.0, d);
  gl_FragColor = vec4(0.2, 0.9, 0.82, soft * vAlpha);
}
`

function ConstellationNetwork() {
  const nodesRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)
  const pulsesRef = useRef<THREE.Points>(null)
  const { pointer, viewport } = useThree()
  const mouse = useRef(new THREE.Vector2())

  const { pos, vel, baseSizes, baseAlphas, colors, liveAlphas } = useMemo(() => {
    const p = new Float32Array(COUNT * 3)
    const v = new Float32Array(COUNT * 3)
    const s = new Float32Array(COUNT)
    const ba = new Float32Array(COUNT)
    const c = new Float32Array(COUNT * 3)
    const la = new Float32Array(COUNT)

    for (let i = 0; i < COUNT; i++) {
      p[i * 3] = (Math.random() - 0.5) * BX * 2
      p[i * 3 + 1] = (Math.random() - 0.5) * BY * 2
      p[i * 3 + 2] = (Math.random() - 0.5) * BZ * 2

      v[i * 3] = (Math.random() - 0.5) * 0.003
      v[i * 3 + 1] = (Math.random() - 0.5) * 0.003
      v[i * 3 + 2] = (Math.random() - 0.5) * 0.001

      const isHub = i < 8
      s[i] = isHub ? 2.2 + Math.random() * 0.8 : 1.0 + Math.random() * 1.0
      ba[i] = isHub ? 0.45 + Math.random() * 0.15 : 0.15 + Math.random() * 0.15
      la[i] = ba[i]

      const zNorm = (p[i * 3 + 2] + BZ) / (BZ * 2)
      const depthT = 1 - zNorm
      const col = depthT < 0.5
        ? lerpColor(TEAL, CYAN, depthT * 2)
        : lerpColor(CYAN, INDIGO, (depthT - 0.5) * 2)
      c[i * 3] = col[0]
      c[i * 3 + 1] = col[1]
      c[i * 3 + 2] = col[2]
    }
    return { pos: p, vel: v, baseSizes: s, baseAlphas: ba, colors: c, liveAlphas: la }
  }, [])

  const pulseState = useRef(
    Array.from({ length: PULSE_COUNT }, () => ({
      from: Math.floor(Math.random() * COUNT),
      to: Math.floor(Math.random() * COUNT),
      t: Math.random(),
      speed: 0.003 + Math.random() * 0.005,
    }))
  )
  const pulsePos = useMemo(() => new Float32Array(PULSE_COUNT * 3), [])
  const pulseAlpha = useMemo(() => new Float32Array(PULSE_COUNT), [])

  const maxPairs = COUNT * COUNT
  const lineBuf = useMemo(() => new Float32Array(maxPairs * 6), [maxPairs])
  const lineColBuf = useMemo(() => new Float32Array(maxPairs * 6), [maxPairs])

  useFrame(() => {
    const nodes = nodesRef.current
    const lines = linesRef.current
    const pulses = pulsesRef.current
    if (!nodes || !lines || !pulses) return

    mouse.current.set(
      (pointer.x * viewport.width) / 2,
      (pointer.y * viewport.height) / 2
    )

    const arr = nodes.geometry.attributes.position.array as Float32Array
    const alphaArr = nodes.geometry.attributes.aAlpha.array as Float32Array

    // Particle-particle repulsion to prevent clustering
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3
      for (let j = i + 1; j < COUNT; j++) {
        const j3 = j * 3
        const dx = arr[i3] - arr[j3]
        const dy = arr[i3 + 1] - arr[j3 + 1]
        const dz = arr[i3 + 2] - arr[j3 + 2]
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz)
        if (d < REPEL_DIST && d > 0.01) {
          const force = ((REPEL_DIST - d) / REPEL_DIST) * 0.0004 / d
          vel[i3] += dx * force
          vel[i3 + 1] += dy * force
          vel[i3 + 2] += dz * force
          vel[j3] -= dx * force
          vel[j3 + 1] -= dy * force
          vel[j3 + 2] -= dz * force
        }
      }
    }

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3
      const dx = mouse.current.x - arr[i3]
      const dy = mouse.current.y - arr[i3 + 1]
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < MOUSE_RADIUS) {
        const f = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * 0.0003
        vel[i3] += dx * f
        vel[i3 + 1] += dy * f
      }

      alphaArr[i] = baseAlphas[i]

      vel[i3] *= 0.99
      vel[i3 + 1] *= 0.99
      vel[i3 + 2] *= 0.99
      arr[i3] += vel[i3]
      arr[i3 + 1] += vel[i3 + 1]
      arr[i3 + 2] += vel[i3 + 2]

      const bounds = [BX, BY, BZ]
      for (let a = 0; a < 3; a++) {
        if (arr[i3 + a] > bounds[a]) { arr[i3 + a] = bounds[a]; vel[i3 + a] *= -0.5 }
        if (arr[i3 + a] < -bounds[a]) { arr[i3 + a] = -bounds[a]; vel[i3 + a] *= -0.5 }
      }
    }
    nodes.geometry.attributes.position.needsUpdate = true
    nodes.geometry.attributes.aAlpha.needsUpdate = true

    let li = 0
    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3
      for (let j = i + 1; j < COUNT; j++) {
        const j3 = j * 3
        const ddx = arr[i3] - arr[j3]
        const ddy = arr[i3 + 1] - arr[j3 + 1]
        const ddz = arr[i3 + 2] - arr[j3 + 2]
        const d = Math.sqrt(ddx * ddx + ddy * ddy + ddz * ddz)

        if (d < CONNECT_DIST) {
          const fade = 1 - d / CONNECT_DIST
          const a = fade * 0.12

          lineBuf[li] = arr[i3]
          lineBuf[li + 1] = arr[i3 + 1]
          lineBuf[li + 2] = arr[i3 + 2]
          lineBuf[li + 3] = arr[j3]
          lineBuf[li + 4] = arr[j3 + 1]
          lineBuf[li + 5] = arr[j3 + 2]

          const ci = i * 3, cj = j * 3
          const cr = (colors[ci] + colors[cj]) * 0.5 * a * 4
          const cg = (colors[ci + 1] + colors[cj + 1]) * 0.5 * a * 4
          const cb = (colors[ci + 2] + colors[cj + 2]) * 0.5 * a * 4
          lineColBuf[li] = cr; lineColBuf[li + 1] = cg; lineColBuf[li + 2] = cb
          lineColBuf[li + 3] = cr; lineColBuf[li + 4] = cg; lineColBuf[li + 5] = cb
          li += 6
        }
      }
    }

    const lp = lines.geometry.attributes.position as THREE.BufferAttribute
    const lc = lines.geometry.attributes.color as THREE.BufferAttribute
    ;(lp.array as Float32Array).set(lineBuf.subarray(0, li))
    ;(lc.array as Float32Array).set(lineColBuf.subarray(0, li))
    lines.geometry.setDrawRange(0, li / 3)
    lp.needsUpdate = true
    lc.needsUpdate = true

    const pArr = pulses.geometry.attributes.position.array as Float32Array
    const paArr = pulses.geometry.attributes.aAlpha.array as Float32Array
    for (let p = 0; p < PULSE_COUNT; p++) {
      const pulse = pulseState.current[p]
      pulse.t += pulse.speed
      if (pulse.t > 1) {
        pulse.from = Math.floor(Math.random() * COUNT)
        pulse.to = Math.floor(Math.random() * COUNT)
        pulse.t = 0
        pulse.speed = 0.003 + Math.random() * 0.005
      }
      const fi = pulse.from * 3, ti = pulse.to * 3
      pArr[p * 3] = arr[fi] + (arr[ti] - arr[fi]) * pulse.t
      pArr[p * 3 + 1] = arr[fi + 1] + (arr[ti + 1] - arr[fi + 1]) * pulse.t
      pArr[p * 3 + 2] = arr[fi + 2] + (arr[ti + 2] - arr[fi + 2]) * pulse.t

      const pdx = arr[fi] - arr[ti], pdy = arr[fi + 1] - arr[ti + 1], pdz = arr[fi + 2] - arr[ti + 2]
      const pd = Math.sqrt(pdx * pdx + pdy * pdy + pdz * pdz)
      paArr[p] = pd < CONNECT_DIST ? 0.4 : 0
    }
    pulses.geometry.attributes.position.needsUpdate = true
    pulses.geometry.attributes.aAlpha.needsUpdate = true
  })

  return (
    <>
      <points ref={nodesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={pos} count={COUNT} itemSize={3} />
          <bufferAttribute attach="attributes-aSize" array={baseSizes} count={COUNT} itemSize={1} />
          <bufferAttribute attach="attributes-aAlpha" array={liveAlphas} count={COUNT} itemSize={1} />
          <bufferAttribute attach="attributes-aColor" array={colors} count={COUNT} itemSize={3} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={NODE_VERT}
          fragmentShader={NODE_FRAG}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={new Float32Array(maxPairs * 6)} count={maxPairs * 2} itemSize={3} />
          <bufferAttribute attach="attributes-color" array={new Float32Array(maxPairs * 6)} count={maxPairs * 2} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial vertexColors transparent opacity={0.5} blending={THREE.AdditiveBlending} depthWrite={false} />
      </lineSegments>

      <points ref={pulsesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" array={pulsePos} count={PULSE_COUNT} itemSize={3} />
          <bufferAttribute attach="attributes-aAlpha" array={pulseAlpha} count={PULSE_COUNT} itemSize={1} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={PULSE_VERT}
          fragmentShader={PULSE_FRAG}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </>
  )
}

function CameraRig() {
  const { camera, pointer } = useThree()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    camera.position.x += (Math.sin(t * 0.06) * 0.2 + pointer.x * 0.2 - camera.position.x) * 0.015
    camera.position.y += (Math.cos(t * 0.045) * 0.15 + pointer.y * 0.15 - camera.position.y) * 0.015
    camera.lookAt(0, 0, 0)
  })

  return null
}

function Scene() {
  return (
    <>
      <CameraRig />
      <ConstellationNetwork />
    </>
  )
}

export function NetworkVisualization() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <Canvas
      className="absolute inset-0 w-full h-full"
      camera={{ position: [0, 0, 12], fov: 60, near: 0.1, far: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}
