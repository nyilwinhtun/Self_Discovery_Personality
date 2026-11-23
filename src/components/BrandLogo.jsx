import React from 'react'

/**
 * Bespoke single-line brand mark for Self Discovery:
 * a calm side-profile head silhouette with a poised inner compass
 * dial and terracotta needle pointing toward the upper right.
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
      {/* Calm, well-proportioned side-profile head silhouette */}
      <path
        d="M10.5 27.2c0-2-.7-3.4-1.9-4.7-1.8-2-2.6-4.7-2.4-7.7.3-5.4 4.5-9.6 10-9.6 4 0 7 2.3 7.9 6 .2.9.5 1.5 1.2 2.5l1 1.6c.4.6.1 1.4-.7 1.6l-1.1.2c.1 1.1-.1 2.2-.5 3.3-.4 1.1-1.4 1.9-2.7 2l-1.7.1c-.7 0-1.1.5-1.1 1.3v3.4"
        stroke="#1C1917"
      />
      {/* Inner compass dial inside the mind area */}
      <circle cx="15" cy="14.2" r="4.8" stroke="#1C1917" strokeWidth="1.5" />
      {/* Compass needle: charcoal tail + terracotta pointer toward upper right */}
      <path d="M12.6 16.6L15 14.2" stroke="#1C1917" strokeWidth="1.5" />
      <path d="M15 14.2l2.9-2.9" stroke="#A6523E" />
      <path d="M15.4 11.3h2.5v2.5" stroke="#A6523E" />
      <circle cx="15" cy="14.2" r="1.1" fill="#FAF8F5" stroke="#1C1917" strokeWidth="1.4" />
    </svg>
  )
}
