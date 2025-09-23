"use client"

import { SignUp } from "@clerk/nextjs"

const HAS_CLERK = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY)

export default function Page() {
  if (!HAS_CLERK) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md rounded-xl border border-(--color-deep)/10 bg-(--color-bg) p-6">
          <h2 className="font-serif text-2xl font-bold text-(--color-deep)">Configure Authentication</h2>
          <p className="mt-2 text-(--color-deep)/75">
            Add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY and CLERK_SECRET_KEY in Project Settings → Environment Variables. Then
            refresh to enable Sign Up.
          </p>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <SignUp appearance={{ variables: { colorPrimary: "var(--color-brand)" } }} afterSignUpUrl="/dashboard" />
    </div>
  )
}
