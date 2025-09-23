import type React from "react"
import { Sidebar } from "@/components/dashboard/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-green-50 grid md:grid-cols-[280px_1fr] min-h-[calc(100dvh-0px)]">
      <Sidebar />
      <main className="bg-(--color-bg) text-(--color-deep) p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-6">{children}</div>
      </main>
    </div>
  )
}
