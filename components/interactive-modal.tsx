"use client"

import { useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

interface InteractiveModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export function InteractiveModal({ isOpen, onClose, title, children }: InteractiveModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.body.style.overflow = "hidden"
    }
    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = "auto"
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4" onClick={onClose}>
          <motion.div
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />

          <motion.div
            ref={modalRef}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-full sm:max-w-2xl max-h-[90vh] sm:max-h-[85vh] overflow-auto rounded-t-2xl sm:rounded-2xl border border-border bg-card shadow-2xl shadow-primary/10"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3, ease: [0.25, 0.4, 0, 1] }}
          >
            {/* Drag handle on mobile */}
            <div className="sm:hidden flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-border/60" />
            </div>

            <div className="sticky top-0 flex items-center justify-between p-4 sm:p-6 border-b border-border bg-card/95 backdrop-blur-sm z-10">
              <h3 className="text-base sm:text-xl font-semibold text-foreground pr-4 line-clamp-2">{title}</h3>
              <motion.button
                onClick={onClose}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface transition-all shrink-0"
              >
                <X className="w-5 h-5" />
              </motion.button>
            </div>

            <div className="p-4 sm:p-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
