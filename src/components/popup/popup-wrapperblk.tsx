"use client"

import React, { useEffect, useRef, useCallback } from "react"
import { createPortal } from "react-dom"

type Props = {
  children: React.ReactNode
  onClose?: () => void
  className?: string // overlay custom
}

const PopupWrapper: React.FC<Props> = ({ children, onClose, className }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const previouslyFocused = useRef<HTMLElement | null>(null)

  // Lock body scroll & return focus on unmount
  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement
    const original = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = original
      previouslyFocused.current?.focus?.()
    }
  }, [])

  // Close on ESC
  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") onClose?.()
  }, [onClose])

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [onKeyDown])

  // Close when clicking outside dialog
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose?.()
  }

  // Focus first focusable element inside modal
  useEffect(() => {
    const el = modalRef.current
    if (!el) return
    const firstFocusable = el.querySelector<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    firstFocusable?.focus?.()
  }, [])

  // Render in portal to body
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4
                  ${className ?? ""}`}
      onMouseDown={handleBackdropClick}
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black/60 backdrop-blur-sm"
      />
      {/* Dialog */}
      <div
        ref={modalRef}
        className="relative w-full max-w-xl rounded-2xl bg-white shadow-2xl
                   outline-none ring-1 ring-black/5
                   animate-[fadeIn_150ms_ease-out,scaleIn_150ms_ease-out]
                   focus-visible:ring-2 focus-visible:ring-amber-400"
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* Close button (top-right) */}
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center
                     rounded-full border border-neutral-200 bg-white/90
                     hover:bg-neutral-50 hover:border-neutral-300
                     focus:outline-none focus:ring-2 focus:ring-amber-400"
        >
          ✕
        </button>

        {children}
      </div>

      {/* Keyframes (Tailwind arbitrary support — no extra CSS file needed) */}
      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes scaleIn { from { transform: scale(.98) translateY(4px); opacity:.98 }
                             to   { transform: scale(1) translateY(0);   opacity:1 } }
      `}</style>
    </div>,
    document.body
  )
}

export default PopupWrapper
