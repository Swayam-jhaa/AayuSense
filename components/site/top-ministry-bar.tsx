"use client"

import Image from "next/image"

/**
 * A responsive, code-based ministry bar (no image dependency).
 * Left: Emblem + Ministry name; Right: small badges (placeholders).
 * Uses tokens for colors and small type—keeps it accessible and responsive.
 */

export function TopMinistryBar() {
  return (
    <div className="w-full bg-(--color-bg) border-b border-(--color-saffron)">
      <div className="mx-auto max-w-7xl px-4 py-2 flex items-center justify-between text-(--color-deep)">
        <div className="flex items-center gap-3">
          {/* Simple emblem substitute (not a complex SVG) */}
          <Image
           src={'./images/ashok.png'}
           alt="ministry logo"
           height={20}
           width={20}
          />
          <div className="leading-tight">
            <p className="font-semibold text-sm">Ministry of Ayush</p>
            <p className="text-xs opacity-80">Government of India</p>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <Image src={'./images/skill.png'} alt="skill-indi" height={90} width={90} />
             <Image src={'./images/chakki.jpeg'} alt="skill-indi" height={90} width={90} />
        </div>
      </div>
    </div>
  )
}
