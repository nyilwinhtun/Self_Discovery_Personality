import React from 'react'

/**
 * Bespoke 1.75px editorial line-art brand mark for Self Discovery:
 * a calm, balanced dual-hemisphere brain contour in charcoal ink with
 * bidirectional compass needles in warm terracotta along the center seam.
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
      {/* Left brain hemisphere with generous inner breathing room */}
      <path
        d="M13.2 9.2C10.9 8.2 7.8 9.2 7.0 11.8C5.6 13.2 5.4 16.2 6.6 18.0C6.8 21.0 9.6 23.4 13.2 22.8"
        stroke="#1C1917"
      />
      <path d="M9.6 13.0C11.0 14.1 11.0 17.7 9.5 18.9" stroke="#1C1917" />

      {/* Right brain hemisphere */}
      <path
        d="M18.8 9.2C21.1 8.2 24.2 9.2 25.0 11.8C26.4 13.2 26.6 16.2 25.4 18.0C25.2 21.0 22.4 23.4 18.8 22.8"
        stroke="#1C1917"
      />
      <path d="M22.4 13.0C21.0 14.1 21.0 17.7 22.5 18.9" stroke="#1C1917" />

      {/* Center balance point and compass arrows in warm terracotta */}
      <circle cx="16" cy="16" r="1.6" stroke="#A6523E" />
      <path d="M16 14.4V5.2" stroke="#A6523E" />
      <path d="M14.0 7.4L16 5.2L18.0 7.4" stroke="#A6523E" />
      <path d="M16 17.6V26.8" stroke="#A6523E" />
      <path d="M14.0 24.6L16 26.8L18.0 24.6" stroke="#A6523E" />
    </svg>
  )
}
