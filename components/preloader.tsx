"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Preloader() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const duration = 2000
    const interval = 20
    let current = 0

    const timer = setInterval(() => {
      current += (100 / (duration / interval)) * (1 + Math.random() * 0.5)
      if (current >= 100) {
        current = 100
        clearInterval(timer)
        setTimeout(() => setIsLoading(false), 400)
      }
      setProgress(Math.min(current, 100))
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-background"
          exit={{
            clipPath: "inset(0 0 100% 0)",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div className="relative flex flex-col items-center gap-8">
            {/* Name reveal */}
            <div className="overflow-hidden">
              <motion.h1
                className="text-5xl md:text-7xl font-serif font-medium tracking-tight"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
              >
                <span className="text-foreground">K</span>
                <span className="text-primary">W</span>
              </motion.h1>
            </div>

            {/* Progress bar */}
            <div className="w-48 h-px bg-border/30 relative overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-primary"
                style={{ width: `${progress}%` }}
                transition={{ ease: "linear" }}
              />
            </div>

            {/* Progress number */}
            <motion.span
              className="text-xs font-mono text-muted-foreground tabular-nums"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {Math.round(progress)}%
            </motion.span>
          </div>

          {/* Corner decorations */}
          <motion.div
            className="absolute top-8 left-8 w-8 h-8 border-l border-t border-primary/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          />
          <motion.div
            className="absolute bottom-8 right-8 w-8 h-8 border-r border-b border-primary/30"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
