import { TopMinistryBar } from "@/components/site/top-ministry-bar"
import { Navbar } from "@/components/site/navbar"
import { Hero } from "@/components/site/hero"
import { MarqueeStrip } from "@/components/site/marquee-strip"

import { HowItWorks } from "@/components/site/how-it-works"
import { FAQ } from "@/components/site/faq"
import { SiteFooter } from "@/components/site/footer"
import { ETongueSection } from "@/components/site/section-e-tongue"

export default function HomePage() {
  return (
    <main>
      <TopMinistryBar />
      <Navbar />
      <Hero />
      <MarqueeStrip />
      <ETongueSection />
      <HowItWorks />
      <FAQ />
      <SiteFooter />
    </main>
  )
}
