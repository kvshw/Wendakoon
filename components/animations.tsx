"use client"

import { useRef, type ReactNode, type HTMLAttributes } from "react"
import { motion, useInView, useMotionValue, useSpring, useTransform, type Variants } from "framer-motion"

// --- Text Reveal: Characters animate in one by one ---
export function TextReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: string
  className?: string
  delay?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const words = children.split(" ")

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={isInView ? { y: "0%" } : { y: "100%" }}
            transition={{
              duration: 0.5,
              ease: [0.76, 0, 0.24, 1],
              delay: delay + i * 0.04,
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && "\u00A0"}
        </span>
      ))}
    </span>
  )
}

// --- Fade In Up: Simple scroll-triggered fade ---
export function FadeIn({
  children,
  className = "",
  delay = 0,
  duration = 0.6,
  direction = "up",
  distance = 40,
}: {
  children: ReactNode
  className?: string
  delay?: number
  duration?: number
  direction?: "up" | "down" | "left" | "right" | "none"
  distance?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const directionMap = {
    up: { y: distance },
    down: { y: -distance },
    left: { x: distance },
    right: { x: -distance },
    none: {},
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...directionMap[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directionMap[direction] }}
      transition={{
        duration,
        ease: [0.25, 0.4, 0, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  )
}

// --- Stagger Container: Children animate in sequence ---
export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.08,
  delay = 0,
  ...props
}: {
  children: ReactNode
  className?: string
  staggerDelay?: number
  delay?: number
} & HTMLAttributes<HTMLDivElement>) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      {...props}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  )
}

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0, 1] },
  },
}

// --- Magnetic Button: Follows cursor within range ---
export function MagneticButton({
  children,
  className = "",
  strength = 0.3,
}: {
  children: ReactNode
  className?: string
  strength?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 })
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 })

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * strength)
    y.set((e.clientY - centerY) * strength)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}

// --- Parallax: Element moves at different speed on scroll ---
export function Parallax({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef(null)

  return (
    <motion.div ref={ref} className={className}>
      {children}
    </motion.div>
  )
}

// --- Scale On Scroll: Element scales as it enters viewport ---
export function ScaleOnScroll({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.7, ease: [0.25, 0.4, 0, 1] }}
    >
      {children}
    </motion.div>
  )
}

// --- Reveal Line: Horizontal line that draws in ---
export function RevealLine({ className = "", delay = 0 }: { className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      className={`h-px bg-primary ${className}`}
      initial={{ scaleX: 0, originX: 0 }}
      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay }}
    />
  )
}

// --- Count Up: Animated number ---
export function CountUp({
  target,
  suffix = "",
  className = "",
  duration = 2,
}: {
  target: number
  suffix?: string
  className?: string
  duration?: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const count = useMotionValue(0)
  const springCount = useSpring(count, { duration: duration * 1000 })
  const rounded = useTransform(springCount, (v) => Math.round(v))

  if (isInView) {
    count.set(target)
  }

  return (
    <span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  )
}
