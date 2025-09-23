"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useState } from "react"

const faqs = [
  {
    q: "What is an E‑Tongue?",
    a: "An electronic tongue uses sensor arrays to capture taste signatures. We analyze these signals to quantify Ayurvedic rasa and identify possible adulteration.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. We do not store your sensor keys on the client, and your data is protected by role-based access and secure infrastructure.",
  },
  {
    q: "Can I export reports?",
    a: "You can export batch reports as PDF/CSV to share with your team or for compliance.",
  },
]

export function FAQ() {
  const [open, setOpen] = useState<string | undefined>(undefined)

  return (
    <section className="bg-green-50 rounded-none sm:rounded-lg lg:rounded-full py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-4">
        <h2 className="font-serif text-2xl sm:text-3xl lg:text-3xl font-bold text-(--color-deep) text-center mb-6 sm:mb-8">
          Frequently Asked Questions
        </h2>
        <div className="rounded-xl lg:rounded-2xl bg-(--color-bg) p-3 sm:p-4 lg:p-4 border border-(--color-deep)/10 shadow-sm">
          <Accordion type="single" collapsible value={open} onValueChange={setOpen} className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className={`rounded-lg lg:rounded-xl my-1 sm:my-2 border border-transparent data-[state=open]:border-(--color-saffron)/50 bg-(--color-bg) transition-all duration-200`}
              >
                <AccordionTrigger className="px-3 sm:px-4 py-3 sm:py-3 text-left font-semibold text-(--color-deep) [&[data-state=open]_svg]:rotate-45 text-sm sm:text-base hover:no-underline group">
                  <span className="flex-1 pr-2">{f.q}</span>
                  {/* plus/minus icon */}
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    className="transition-transform duration-200 shrink-0 group-hover:text-(--color-saffron)"
                  >
                    <path 
                      d="M12 5v14M5 12h14" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                    />
                  </svg>
                </AccordionTrigger>
                <AccordionContent className="px-3 sm:px-4 pb-3 sm:pb-4 text-(--color-deep)/75 text-sm sm:text-base leading-relaxed">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}