import React from 'react'

/**
 * Bespoke 1.75px editorial line-art brand mark for Self Discovery:
 * a calm circular compass ring with subtle cardinal ticks, a simple
 * left-side brain hemisphere contour, and a warm terracotta compass arrow
 * pointing right on the opposite side.
 */
export default function BrandLogo({ size = 28, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label="Self Discovery logo"
      className={className}
    >
      {/* Outer compass ring with comfortable inner breathing room */}
      <circle cx="16" cy="16" r="12" stroke="#1C1917" />
      {/* Subtle cardinal ticks */}
      <path d="M16 4v1.2M16 26.8V28M4 16h1.2M26.8 16H28" stroke="#1C1917" />
      {/* Left side: calm, simple brain-hemisphere contour */}
      <path
        d="M14 10c-2.8-.4-5 1.2-5.2 3.6-.4 1.4-.4 3.4 0 4.8.2 2.4 2.4 4 5.2 3.6V10Z"
        stroke="#1C1917"
      />
      <path d="M11.4 13.6c1 1 1 3.8 0 4.8" stroke="#1C1917" />
      {/* Right side: rightward compass arrow in warm terracotta */}
      <path d="M16.6 16h7" stroke="#A6523E" />
      <path d="M20.6 13l3 3-3 3" stroke="#A6523E" />
    </svg>
  )
}
