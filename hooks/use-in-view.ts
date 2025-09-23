"use client"

import { useEffect, useRef, useState } from "react"

export function useInView<T extends HTMLElement>(options?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold: 0.15,
      rootMargin: "0px",
      ...options,
    })
    obs.observe(el)
    return () => obs.disconnect()
  }, [options])

  return { ref, inView }
}
