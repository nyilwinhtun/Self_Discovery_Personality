import React from 'react'

/**
 * Bespoke single-line brand mark for Self Discovery:
 * a calm left-facing side-profile head silhouette with a poised inner
 * compass dial and terracotta needle pointing toward the upper left.
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
      {/* Calm, well-proportioned left-facing side-profile head silhouette */}
      <path
        d="M12.2 27.2c.4-1.9.5-3.6.1-5.1-2.2-.1-3.3-.8-3.4-2.3-.1-.9.3-1.6 0-2.3-.2-.6.2-1.2-.1-1.8l-1.6-.9c-.4-.3-.3-.8.1-1.1l1.6-1.6c.4-3.5 3.6-7.1 8.5-7.1 5 0 8.1 3.8 7.8 9-.2 3.9-2.1 6.6-4.5 8.2-.4 2 0 3.6.9 5"
        stroke="#1C1917"
      />
      {/* Inner compass dial inside the mind area */}
      <circle cx="17.4" cy="13.5" r="4.5" stroke="#1C1917" strokeWidth="1.45" />
      {/* Compass needle: charcoal tail + terracotta pointer toward upper left */}
      <path d="M19.5 15.6L17.4 13.5" stroke="#1C1917" strokeWidth="1.5" />
      <path d="M17.4 13.5l-2.7-2.7" stroke="#A6523E" />
      <path d="M14.7 13.1v-2.3H17" stroke="#A6523E" />
      <circle cx="17.4" cy="13.5" r="1.05" fill="#FAF8F5" stroke="#1C1917" strokeWidth="1.4" />
    </svg>
  )
}
