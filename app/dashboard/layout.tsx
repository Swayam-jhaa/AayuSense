import type React from "react"
import { Sidebar } from "@/components/dashboard/sidebar"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid md:grid-cols-[280px_1fr] min-h-[calc(100dvh-0px)]">
      <Sidebar />
      <main className="bg-(--color-bg) text-(--color-deep) p-4 md:p-6">{children}</main>
    </div>
  )
}
