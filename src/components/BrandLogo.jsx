import React from 'react'

/**
 * Bespoke 1.75px single-line brand mark for Self Discovery:
 * a calm side-profile head silhouette with an inner compass needle
 * tilted gently toward the upper right.
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
      {/* Calm, minimalist side-profile head silhouette */}
      <path
        d="M11 27.5v-2.6c0-1.1-.6-2.1-1.5-2.7-1.9-1.3-3-3.5-3-6.1 0-5.4 4.2-9.6 9.8-9.6 4.4 0 8.1 2.7 9 6.6l1.4 3.4c.3.7-.2 1.5-.9 1.6l-1.3.2v2.7c0 1.4-1.1 2.5-2.5 2.5h-2.5v4"
        stroke="#1C1917"
      />
      {/* Subtle poised inner compass needle tilted toward upper right */}
      <path d="M13.2 18.8l5.8-5.8" stroke="#A6523E" />
      <path d="M15.6 12.6l3.4.4-.4 3.4" stroke="#A6523E" />
      <circle cx="13.2" cy="18.8" r="1.1" stroke="#1C1917" />
    </svg>
  )
}
