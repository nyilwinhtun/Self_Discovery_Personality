import React from 'react'

/**
 * Unified 1.75px hand-crafted line-art emblems for Self Discovery modules.
 * Matches the visual grammar of LikertScaleSelector's line-art icons
 * (viewBox="0 0 28 28", strokeWidth="1.75", round caps and joins, fill="none").
 */
const BASE_SVG_PROPS = {
  viewBox: '0 0 28 28',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: '1.75',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': 'true',
}

export function TraitLensEmblem({ size = 28, className = '' }) {
  return (
    <svg width={size} height={size} className={className} {...BASE_SVG_PROPS}>
      <circle cx="14" cy="14" r="9.5" />
      <path d="M9.5 17.5c1.8-3.8 5.2-6.5 9-7.5" />
      <circle cx="14" cy="14" r="3.2" />
    </svg>
  )
}

export function InnerCompassEmblem({ size = 28, className = '' }) {
  return (
    <svg width={size} height={size} className={className} {...BASE_SVG_PROPS}>
      <circle cx="14" cy="14" r="9.75" />
      <path d="M14 4.25v1.8" />
      <path d="M14 21.95v1.8" />
      <path d="M4.25 14h1.8" />
      <path d="M21.95 14h1.8" />
      <path d="M10.4 17.6l2-5.2 5.2-2-2 5.2-5.2 2z" />
    </svg>
  )
}

export function EmotionLensEmblem({ size = 28, className = '' }) {
  return (
    <svg width={size} height={size} className={className} {...BASE_SVG_PROPS}>
      <path d="M4.5 11.2c2.4-2.2 4.8-2.2 7.2 0s4.8 2.2 7.2 0 3.2-1.5 4.6-.2" />
      <path d="M4.5 17.2c2.4-2.2 4.8-2.2 7.2 0s4.8 2.2 7.2 0 3.2-1.5 4.6-.2" />
    </svg>
  )
}

export function BondSenseEmblem({ size = 28, className = '' }) {
  return (
    <svg width={size} height={size} className={className} {...BASE_SVG_PROPS}>
      <circle cx="11" cy="13.5" r="6.25" />
      <circle cx="17" cy="14.5" r="6.25" />
    </svg>
  )
}

export function ValueMapEmblem({ size = 28, className = '' }) {
  return (
    <svg width={size} height={size} className={className} {...BASE_SVG_PROPS}>
      <path d="M14 5.2l1.6 4.4 4.4 1.6-4.4 1.6L14 17.2l-1.6-4.4L8 11.2l4.4-1.6L14 5.2z" />
      <path d="M4.5 22.2c3.2-2.6 6.3-3.6 9.5-3.6s6.3 1 9.5 3.6" />
    </svg>
  )
}

export function CareerInterestEmblem({ size = 28, className = '' }) {
  return (
    <svg width={size} height={size} className={className} {...BASE_SVG_PROPS}>
      <path d="M14 22.5V11" />
      <path d="M14 14.2c0-4.2 3.2-7 7.5-7 0 4.2-3.2 7-7.5 7z" />
      <path d="M14 16.5c0-3.5-2.6-5.8-6.2-5.8 0 3.5 2.6 5.8 6.2 5.8z" />
      <path d="M7.5 22.5c2.2-.8 4.4-1.1 6.5-1.1s4.3.3 6.5 1.1" />
    </svg>
  )
}
