// components/site/navbar.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs"
import Image from "next/image"

const links = [
  { href: "/", label: "Home" },
  { href: "/livetest", label: "LiveTest" },
  { href: "/results", label: "Results" },
  { href: "/remedies", label: "Remedies" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact Us" },
]

const HAS_CLERK = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)

export function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-green-50">
      <div className="mx-auto max-w-7xl px-4 py-2">
        <nav className="flex items-center justify-between rounded-2xl border border-gray-200/30 bg-white/80 backdrop-blur-md shadow-sm px-6 py-3">
          <Link href="/" className="flex items-center gap-2">
            <Image 
              src="/images/ayurveda.png" 
              alt="logo" 
              width={32} 
              height={32} 
              className="h-8 w-8 rounded-md bg-green-50 border border-green-200" 
            />
            <span className="font-serif text-xl font-bold text-gray-900">Aayuwave</span>
          </Link>

          <button
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation"
          >
            <div className="h-4 w-4 relative">
              <span
                className={`absolute inset-x-0 top-0 h-0.5 bg-gray-800 transition-all ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`absolute inset-x-0 top-2 h-0.5 bg-gray-800 transition-opacity ${open ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`absolute inset-x-0 top-4 h-0.5 bg-gray-800 transition-all ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </div>
          </button>

          <ul className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`text-sm font-medium transition-colors hover:text-green-600 ${
                    pathname === l.href ? "text-green-600" : "text-gray-800"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            {HAS_CLERK ? (
              <>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="px-4 py-2 rounded-lg border border-green-600 text-green-600 hover:bg-green-50 transition-colors">
                      Sign in
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <button className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors">
                      Register
                    </button>
                  </SignUpButton>
                </SignedOut>
                <SignedIn>
                  <Link
                    href="/dashboard"
                    className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
                  >
                    Dashboard
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </>
            ) : (
              <>
                <button className="px-4 py-2 rounded-lg border border-green-600 text-green-600 hover:bg-green-50 transition-colors">
                  Sign in
                </button>
                <button className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors">
                  Register
                </button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          id="mobile-nav"
          className={`md:hidden grid overflow-hidden transition-[grid-template-rows] ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <ul className="mt-2 rounded-xl border border-gray-200/30 bg-white/90 backdrop-blur-md p-4 space-y-2">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="block rounded-lg px-3 py-2 text-gray-800 hover:bg-green-50 transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="flex gap-2 pt-2">
                <button className="flex-1 px-3 py-2 rounded-lg border border-green-600 text-green-600 hover:bg-green-50">
                  Sign in
                </button>
                <button className="flex-1 px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">
                  Register
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}