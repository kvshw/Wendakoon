"use client"

import { Suspense, useEffect, useMemo, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Html, OrbitControls } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { useRouter } from "next/navigation"
import * as THREE from "three"

const TEAL = "#2abdaf"
const TEAL_LIGHT = "#6ccfd3"
const TEAL_PIT = "#1a756d"

const SITE_NODES = [
  { label: "About", hint: "Background & how this site works.", href: "/#lens" },
  { label: "Research", hint: "Domains, methods & doctoral focus.", href: "/#research" },
  { label: "Projects", hint: "Selected case files & shipped work.", href: "/#projects" },
  { label: "CV", hint: "Experience, skills & timeline.", href: "/#cv" },
  { label: "Publications", hint: "Papers, talks & prototypes.", href: "/#outputs" },
  { label: "Contact", hint: "Email, form & collaboration.", href: "/#contact" },
  { label: "Chat", hint: "Ask the portfolio assistant about my work.", href: "/chat" },
] as const

const NODE_COUNT = SITE_NODES.length
const SPHERE_R = 1.1
const NODE_R = 1.35
const ORB_OFFSET_X = 0.85

type NodeConfig = (typeof SITE_NODES)[number]

function fibSphere(i: number, n: number, r: number): THREE.Vector3 {
  const golden = Math.PI * (3 - Math.sqrt(5))
  const y = 1 - (i / (n - 1)) * 2
  const rad = Math.sqrt(1 - y * y)
  const theta = golden * i
  return new THREE.Vector3(
    Math.cos(theta) * rad * r,
    y * r,
    Math.sin(theta) * rad * r
  )
}

function usePebbleTexture() {
  return useMemo(() => {
    const size = 1024
    const canvas = document.createElement("canvas")
    canvas.width = size
    canvas.height = size
    const ctx = canvas.getContext("2d")!

    ctx.fillStyle = TEAL_PIT
    ctx.fillRect(0, 0, size, size)

    for (let i = 0; i < 50000; i++) {
      const x = Math.random() * size
      const y = Math.random() * size
      const s = Math.random() * 2 + 1
      const grad = ctx.createRadialGradient(x, y, 0, x, y, s)
      grad.addColorStop(0, TEAL)
      grad.addColorStop(1, TEAL_PIT)
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(x, y, s, 0, Math.PI * 2)
      ctx.fill()
    }

    const tex = new THREE.CanvasTexture(canvas)
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping
    tex.repeat.set(2, 1)
    return tex
  }, [])
}

function SapphireOrb({ reducedMotion }: { reducedMotion: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const pebbleMap = usePebbleTexture()

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    if (!reducedMotion) {
      meshRef.current.scale.setScalar(1 + Math.sin(t * 0.4) * 0.008)
    }
    if (meshRef.current.material) {
      const m = meshRef.current.material as THREE.MeshPhysicalMaterial
      m.emissiveIntensity = reducedMotion ? 0.05 : 0.04 + Math.sin(t * 0.3) * 0.02
    }
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[SPHERE_R, 128, 128]} />
      <meshPhysicalMaterial
        color={TEAL}
        map={pebbleMap}
        bumpMap={pebbleMap}
        bumpScale={0.05}
        roughness={0.7}
        metalness={0.2}
        clearcoat={0.3}
        clearcoatRoughness={0.5}
        emissive={TEAL}
        emissiveIntensity={0.05}
        envMapIntensity={0.8}
      />
    </mesh>
  )
}

function ConnectorLines({ positions }: { positions: THREE.Vector3[] }) {
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry()
    const verts = new Float32Array(positions.length * 2 * 3)
    let o = 0
    for (const p of positions) {
      const dir = p.clone().normalize()
      const surfPt = dir.multiplyScalar(SPHERE_R * 1.01)
      verts[o++] = surfPt.x
      verts[o++] = surfPt.y
      verts[o++] = surfPt.z
      verts[o++] = p.x
      verts[o++] = p.y
      verts[o++] = p.z
    }
    g.setAttribute("position", new THREE.BufferAttribute(verts, 3))
    return g
  }, [positions])

  return (
    <lineSegments geometry={geom}>
      <lineBasicMaterial
        color={TEAL_LIGHT}
        transparent
        opacity={0.25}
        depthWrite={false}
        toneMapped={false}
      />
    </lineSegments>
  )
}

function SiteNode({ config, showTooltip = true }: { config: NodeConfig; showTooltip?: boolean }) {
  const router = useRouter()
  const [hover, setHover] = useState(false)
  const { gl } = useThree()

  return (
    <group>
      <mesh
        onPointerOver={(e) => {
          e.stopPropagation()
          setHover(true)
          gl.domElement.style.cursor = "pointer"
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHover(false)
          gl.domElement.style.cursor = "grab"
        }}
        onClick={(e) => {
          e.stopPropagation()
          router.push(config.href)
        }}
      >
        <sphereGeometry args={[0.14, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.04, 20, 20]} />
        <meshBasicMaterial
          color={hover ? "#8df0f4" : TEAL_LIGHT}
          transparent
          opacity={hover ? 1 : 0.85}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>

      <mesh scale={hover ? 1.6 : 1}>
        <sphereGeometry args={[0.065, 16, 16]} />
        <meshBasicMaterial
          color={TEAL}
          transparent
          opacity={hover ? 0.3 : 0.08}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      {showTooltip ? (
        <Html
          position={[0, 0.16, 0]}
          center
          distanceFactor={12}
          style={{ pointerEvents: "none" }}
          zIndexRange={[220, 0]}
        >
          <div
            className={`pointer-events-none w-auto whitespace-nowrap rounded-md border border-primary/20 bg-card/85 px-1.5 py-0.5 text-left shadow-md backdrop-blur-md transition-all duration-200 ${
              hover ? "opacity-100" : "opacity-0"
            }`}
          >
            <p className="text-[9px] font-medium text-primary/95 leading-tight">
              {config.label}
            </p>
            <p className="mt-0.5 text-[8px] leading-snug text-muted-foreground/90">
              {config.hint}
            </p>
          </div>
        </Html>
      ) : null}
    </group>
  )
}

function SceneContent({
  reducedMotion,
  orbOffsetX,
  orbScale = 1,
  showTooltip = true,
}: {
  reducedMotion: boolean
  orbOffsetX: number
  orbScale?: number
  showTooltip?: boolean
}) {
  const target = useMemo(() => new THREE.Vector3(orbOffsetX, 0, 0), [orbOffsetX])
  const nodePositions = useMemo(
    () => Array.from({ length: NODE_COUNT }, (_, i) => fibSphere(i, NODE_COUNT, NODE_R)),
    []
  )

  return (
    <>
      <directionalLight position={[5, 10, 5]} intensity={2} color="#ffffff" />
      <pointLight position={[-5, 0, 3]} intensity={14} color={TEAL} distance={12} />
      <pointLight position={[4, -3, -4]} intensity={3} color={TEAL_LIGHT} distance={10} />
      <ambientLight intensity={0.08} />

      <OrbitControls
        makeDefault
        enableZoom={false}
        enablePan={false}
        autoRotate={!reducedMotion}
        autoRotateSpeed={0.35}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI - Math.PI / 6}
        rotateSpeed={reducedMotion ? 0.35 : 0.55}
        dampingFactor={0.04}
        enableDamping
        target={target}
      />

      <group position={[orbOffsetX, 0, 0]} scale={orbScale}>
        <SapphireOrb reducedMotion={reducedMotion} />
        <ConnectorLines positions={nodePositions} />

        {SITE_NODES.map((config, i) => (
          <group key={config.href} position={nodePositions[i]}>
            <SiteNode config={config} showTooltip={showTooltip} />
          </group>
        ))}
      </group>

      <EffectComposer multisampling={0} enableNormalPass={false}>
        <Bloom
          intensity={reducedMotion ? 0.25 : 0.4}
          luminanceThreshold={0.85}
          luminanceSmoothing={0.4}
          mipmapBlur
          radius={0.4}
        />
      </EffectComposer>
    </>
  )
}

export function HeroScene() {
  const [mounted, setMounted] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    setMounted(true)
    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(media.matches)
    const update = () => setReducedMotion(media.matches)
    media.addEventListener("change", update)
    return () => media.removeEventListener("change", update)
  }, [])

  if (!mounted) return null

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-screen z-20 overflow-visible"
      aria-hidden="true"
    >
      {/* Desktop / tablet: right column */}
      <div
        className="pointer-events-auto absolute top-0 -right-[4%] hidden h-screen w-[58%] overflow-visible cursor-grab active:cursor-grabbing md:block lg:w-[52%] xl:w-[48%]"
        aria-label="Interactive 3D orb — drag to rotate, hover nodes to preview sections, click to navigate."
      >
        <Canvas
          camera={{ position: [0, 0, 8.2], fov: 32, near: 0.1, far: 50 }}
          dpr={[1, 2]}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.1,
          }}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
          className="h-full w-full touch-none overflow-visible!"
          frameloop="always"
        >
          <Suspense fallback={null}>
            <SceneContent
              reducedMotion={reducedMotion}
              orbOffsetX={ORB_OFFSET_X}
              orbScale={1}
              showTooltip
            />
          </Suspense>
        </Canvas>
      </div>

    </div>
  )
}
