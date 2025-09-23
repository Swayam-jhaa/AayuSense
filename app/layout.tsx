import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"

// Fonts
import { Inter, Playfair_Display } from "next/font/google"
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "600", "700", "800", "900"],
})

// Clerk Provider
import { ClerkProvider } from "@clerk/nextjs"

const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export const metadata: Metadata = {
  title: "AAayuSense | E‑Tongue Intelligence for Ayurveda",
  description: "Modern Ayurvedic AI platform for herbal rasa analysis and adulteration detection.",
  generator: "v0.app",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {!publishableKey ? (
        <html lang="en" className={`${inter.variable} ${playfair.variable} antialiased`}>
          <body className="font-sans bg-background text-foreground">
            <div className="w-full bg-yellow-50 text-yellow-900 border-b border-yellow-200">
              <div className="mx-auto max-w-7xl px-4 py-2 text-sm">
                Clerk is not configured. Add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY in Project Settings
                → Environment Variables, then reload.
              </div>
            </div>
            <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            <Analytics />
          </body>
        </html>
      ) : (
        <ClerkProvider
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
          afterSignInUrl="/dashboard"
          afterSignUpUrl="/dashboard"
          appearance={{
            elements: {
              formButtonPrimary: "bg-(--color-brand) hover:bg-(--color-brand-600) text-(--color-bg) rounded-lg",
            },
          }}
          publishableKey={publishableKey}
        >
          <html lang="en" className={`${inter.variable} ${playfair.variable} antialiased`}>
            <body className="font-sans bg-background text-foreground">
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
              <Analytics />
            </body>
          </html>
        </ClerkProvider>
      )}
    </>
  )
}
