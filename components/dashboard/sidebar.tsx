"use client"

import Link from "next/link"
import { useState } from "react"
import { Home, BarChart3, Settings, X } from "lucide-react"
import { SignedIn, SignOutButton } from "@clerk/nextjs"
import Image from "next/image"

export function Sidebar() {
  const [open, setOpen] = useState(true)

  return (
    <aside className={`${open ? "block" : "hidden md:block"} border-r border-(--color-deep)/10 bg-zinc-100`}>
      <div className="h-12 md:hidden flex items-center justify-between px-3">
        <span className="font-semibold text-(--color-deep)">Menu</span>
        <button
          onClick={() => setOpen(false)}
          aria-label="Close sidebar"
          className="h-8 w-8 inline-flex items-center justify-center rounded-lg border border-(--color-deep)/15"
        >
          <X size={16} />
        </button>
      </div>

      <div className="hidden md:flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <Image src={"/images/ayurveda.png"}alt="Logo"width={30} height={30}  className="h-8 w-8 rounded-md bg-(--color-brand)/10 border border-(--color-brand)/30" />
          <span className="font-serif font-bold text-(--color-deep)">Aayuwave</span>
        </div>
        <button
          onClick={() => setOpen(false)}
          aria-label="Close sidebar"
          className="hidden md:inline-flex h-8 w-8 items-center justify-center rounded-lg border border-(--color-deep)/15"
        >
          <X size={16} />
        </button>
      </div>

      <nav className="px-2 py-2 space-y-1">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-3 h-10 rounded-lg hover:bg-(--color-brand)/10 text-(--color-deep) transition-colors"
        >
          <Home size={18} /> Home
        </Link>
        <Link
          href="/dashboard/reports"
          className="flex items-center gap-2 px-3 h-10 rounded-lg hover:bg-(--color-brand)/10 text-(--color-deep) transition-colors"
        >
          <BarChart3 size={18} /> HerbProfile
        </Link>
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-2 px-3 h-10 rounded-lg hover:bg-(--color-brand)/10 text-(--color-deep) transition-colors"
        >
          <Settings size={18} /> Settings
        </Link>
      </nav>

      <div className="mt-auto p-3 sticky top-[100vh]">
        <div className="flex items-center justify-between rounded-xl border border-(--color-deep)/10 bg-(--color-bg) p-3">
          <div className="flex items-center gap-2">
            <Image src={"/images/ayurveda.png"}alt="Logo"width={30} height={30}  className="h-8 w-8 rounded-md bg-(--color-brand)/10 border border-(--color-brand)/30" />
            <span className="font-semibold text-(--color-deep)">Aayuwave</span>
          </div>
          <SignedIn>
            <SignOutButton>
              <button className="px-3 h-9 rounded-lg bg-(--color-saffron) text-(--color-bg) hover:bg-(--color-saffron-600)">
                Logout
              </button>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </aside>
  )
}
