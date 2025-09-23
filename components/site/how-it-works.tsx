"use client"

import React from "react"
import { useInView } from "@/hooks/use-in-view"
import { motion } from "framer-motion"
import { Leaf, Cpu, BarChart3 } from "lucide-react"
import Image from "next/image"

type Step = {
  title: string
  desc: string
  icon: React.ComponentType<any>
  imgPath: string
}

const steps: Step[] = [
  {
    title: "Scan Herbs",
    desc: "Connect the e-tongue sensor and capture the sample taste profile.",
    icon: Leaf,
    imgPath: "/images/image-1.png",
  },
  {
    title: "AI Taste Analysis",
    desc: "Our models quantify rasa dimensions and flag adulteration risks.",
    icon: Cpu,
    imgPath: "/images/img-2.png",
  },
  {
    title: "Get Insights",
    desc: "Receive a clear report with recommendations for your batch.",
    icon: BarChart3,
    imgPath: "/images/img-3.png",
  },
]

export function HowItWorks() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.2 })

  return (
    <section
      id="how"
      className="relative overflow-hidden py-12 sm:py-16 lg:py-20"
      style={{ fontFamily: "Poppins, ui-sans-serif, system-ui" }}
    >
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Responsive heading with different positioning for mobile/desktop */}
        <div className="relative">
          {/* Mobile/Tablet heading - centered */}
          <h2 className="text-center text-3xl sm:text-4xl md:text-5xl lg:hidden font-extrabold text-green-700 tracking-tight mb-8 sm:mb-12">
            HOW IT WORKS ⇲
          </h2>
          
          {/* Desktop heading - with custom positioning */}
          <h2 className="hidden lg:block text-center md:text-6xl text-4xl font-extrabold text-green-700 tracking-tight -ml-[600px] -mt-5">
            HOW IT WORKS ⇲
          </h2>
        </div>

        <div
          ref={ref}
          className="mt-8 sm:mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10"
        >
          {steps.map((s, i) => {
            const Icon = s.icon

            return (
              <motion.article
                key={s.title}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: i * 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col rounded-2xl bg-white border border-emerald-100 shadow-md overflow-hidden hover:shadow-xl transition-shadow max-w-sm mx-auto sm:max-w-none"
              >
                {/* Card Content */}
                <div className="p-4 sm:p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
                      <Icon size={18} className="sm:w-[22px] sm:h-[22px]" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-emerald-800">
                      {s.title}
                    </h3>
                  </div>
                  <p className="mt-3 sm:mt-4 text-slate-600 leading-relaxed text-sm sm:text-sm">
                    {s.desc}
                  </p>
                </div>

                {/* Image Section */}
                <div className="h-40 sm:h-44 lg:h-48 w-full border-t border-emerald-100 flex items-center justify-center p-2 sm:p-0">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={s.imgPath}
                      alt={`${s.title} preview`}
                      width={300}
                      height={200}
                      className="object-contain max-h-32 sm:max-h-36 lg:max-h-40 mb-0 mt-2 sm:mt-3 lg:mt-5 w-auto"
                      sizes="(max-width: 640px) 250px, (max-width: 1024px) 280px, 300px"
                    />
                  </div>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks