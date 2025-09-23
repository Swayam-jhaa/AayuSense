"use client"

import React from "react"

const items = [
  "✨ Discover Your Path to Wellness",
  "🍃 Personalized Ayurvedic Consultations",
  "💚 Trusted by Happy Users",
  "🌱 Natural Healing for Mind, Body",
]

export function MarqueeStrip() {
  return (
    <div className="relative isolate bg-green-400   text-(--color-bg) py-3 my-6 overflow-hidden">
      {/* gradient fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 from-(--color-bg) to-transparent bg-gradient-to-r opacity-70" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 from-transparent to-(--color-bg) bg-gradient-to-r opacity-70" />

      <div className="marquee">
        <div className="track">
          {[...items, ...items].map((t, i) => (
            <span key={i} className="mx-8 font-semibold">
              {t}
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .marquee {
          overflow: hidden;
          position: relative;
          width: 100%;
        }
        .track {
          display: inline-flex;
          white-space: nowrap;
          will-change: transform;
          animation: marquee 20s linear infinite;
        }
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}
