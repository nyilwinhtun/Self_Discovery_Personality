import React from 'react'

/**
 * Original, in-house assessment marks for the Self Discovery interface.
 * These are simple geometric SVGs created for this project and are not copies
 * of third-party assessment or publisher logos.
 */
export function TraitLensLogo({ size = 56, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="TraitLens logo"
      className={className}
      fill="none"
    >
      <circle cx="32" cy="32" r="27" stroke="currentColor" strokeOpacity=".22" strokeWidth="1.5" />
      <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M32 10.5c7.5 5.2 11.8 11.8 11.8 19.1S39.5 43.5 32 48.7C24.5 43.5 20.2 37 20.2 29.6S24.5 15.7 32 10.5Z" />
        <path d="M10.8 32c5.2-7.5 11.8-11.8 19.1-11.8S43.5 24.5 48.7 32C43.5 39.5 37 43.8 29.6 43.8S16 39.5 10.8 32Z" />
        <circle cx="32" cy="32" r="6.5" fill="currentColor" fillOpacity=".12" />
      </g>
      <circle cx="32" cy="32" r="2.2" fill="currentColor" />
    </svg>
  )
}

export function InnerCompassLogo({ size = 56, className = '' }) {
  const rays = Array.from({ length: 6 }, (_, index) => index * 60)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label="InnerCompass logo"
      className={className}
      fill="none"
    >
      <circle cx="32" cy="32" r="27" stroke="currentColor" strokeOpacity=".22" strokeWidth="1.5" />
      <circle cx="32" cy="32" r="18" stroke="currentColor" strokeOpacity=".45" strokeWidth="1.5" />
      <g stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        {rays.map((angle) => <path key={angle} d="M32 8.5v8" transform={`rotate(${angle} 32 32)`} />)}
      </g>
      <path d="m32 19 7.5 13-7.5 13-7.5-13L32 19Z" fill="currentColor" fillOpacity=".15" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <circle cx="32" cy="32" r="3.4" fill="currentColor" />
    </svg>
  )
}

export function BondSenseLogo({ size = 56, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="BondSense logo" className={className} fill="none">
      <circle cx="24" cy="29" r="13.5" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="40" cy="35" r="13.5" stroke="currentColor" strokeWidth="2.4" />
      <path d="M27.5 24.5c2.8-2.1 6.2-2.1 9 0M27.5 39.5c2.8 2.1 6.2 2.1 9 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="29" r="3" fill="currentColor" fillOpacity=".2" />
      <circle cx="40" cy="35" r="3" fill="currentColor" fillOpacity=".2" />
    </svg>
  )
}

export function ValueMapLogo({ size = 56, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="ValueMap logo" className={className} fill="none">
      <circle cx="32" cy="32" r="27" stroke="currentColor" strokeOpacity=".22" strokeWidth="1.5" />
      <path d="M32 11 37 27 53 32 37 37 32 53 27 37 11 32 27 27 32 11Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M32 22 35 32 32 42 29 32 32 22Z" fill="currentColor" fillOpacity=".2" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="32" cy="32" r="3" fill="currentColor" />
    </svg>
  )
}
