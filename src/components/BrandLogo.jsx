import React from 'react'

/**
 * Bespoke 1.75px editorial line-art brand mark for Self Discovery:
 * a calm circular compass ring with cardinal ticks, a gentle inner mind
 * contour curve, and a two-tone compass needle pointing toward the upper right.
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
      {/* Calm outer compass ring with generous breathing room */}
      <circle cx="16" cy="16" r="11.5" stroke="#1C1917" />
      {/* Subtle cardinal ticks */}
      <path d="M16 4.5v1.5M16 26v1.5M4.5 16H6M26 16h1.5" stroke="#1C1917" />
      {/* Gentle inner mind contour curve */}
      <path d="M9.8 16.6c-.4-3.2 1.6-6 4.4-6.2.9-.1 1.5.3 1.8.9" stroke="#1C1917" />
      {/* Compass needle: charcoal tail + terracotta pointer toward upper right */}
      <path d="M16 16l-3.2 3.2" stroke="#1C1917" />
      <path d="M16 16l4.2-4.2" stroke="#A6523E" />
      <path d="M17.8 11.8h2.4v2.4" stroke="#A6523E" />
      <circle cx="16" cy="16" r="1.2" fill="#FAF8F5" stroke="#1C1917" />
    </svg>
  )
}
