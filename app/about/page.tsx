"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { TopMinistryBar } from "@/components/site/top-ministry-bar"
import { Navbar } from "@/components/site/navbar"
import { SiteFooter } from "@/components/site/footer"

interface TeamMember {
  name: string
  role: string
  description: string
  image: string
  roleAccent: "green" | "amber"
}

const teamMembers: TeamMember[] = [
  {
    name: "swayam jha",
    role: "Backend Infrastructure Engineer",
    description: "Manages backend, database, and API architecture.",
    image: "/professional-male-avatar-in-suit.jpg",
    roleAccent: "green",
  },
  {
    name: "anup gupta",
    role: "Experience Design Lead",
    description: "Optimizes user experience and system usability.",
    image: "/professional-male-avatar-in-suit.jpg",
    roleAccent: "green",
  },
  {
    name: "harhsima joshi",
    role: "Innovation Lead",
    description: "Guides all research and project strategy.",
    image: "/professional-female-avatar-in-blue-shirt.jpg",
    roleAccent: "amber",
  },
  {
    name: "umesh pandey",
    role: "Embedded Hardware Engineer",
    description: "Develops sensor integration and microcontroller systems.",
    image: "/professional-male-avatar-in-suit.jpg",
    roleAccent: "green",
  },
  {
    name: "adarsh jain",
    role: "Frontend Application Engineer",
    description: "Builds dashboards and user interfaces.",
    image: "/professional-male-avatar-in-suit.jpg",
    roleAccent: "green",
  },
  {
    name: "alok jain",
    role: "Data Science & Modeling Specialist",
    description: "Designs ML models for analysis and predictions",
    image: "/professional-male-avatar-in-suit.jpg",
    roleAccent: "green",
  },
]

export default function AboutPage() {
  return (
    <main className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <TopMinistryBar />
      <Navbar />

      {/* Hero header matching homepage style */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 self-center space-y-4 sm:space-y-6">
              <p className="text-sm sm:text-base font-semibold text-orange-600 tracking-wide">
                OUR STORY
              </p>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
                About <span className="text-green-500">AayuSense</span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-gray-700 max-w-2xl">
                We bring scientific rigor to Ayurveda with E‑Tongue Intelligence
                for rasa analysis and purity validation—helping practitioners and
                producers make confident decisions.
              </p>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="relative w-full max-w-md mx-auto animate-float">
                <Image
                  src="/images/img_hero-sec.png"
                  alt="E‑Tongue Intelligence Illustration"
                  width={520}
                  height={520}
                  className="object-contain w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Values */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-green-100 bg-white/70 backdrop-blur p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900">Precision</h3>
              <p className="mt-2 text-gray-700">
                Robust sensing pipelines and reproducible analysis for trustworthy
                outcomes.
              </p>
            </div>
            <div className="rounded-2xl border border-green-100 bg-white/70 backdrop-blur p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900">Transparency</h3>
              <p className="mt-2 text-gray-700">
                Insightful visualizations and explainability to make data
                understandable.
              </p>
            </div>
            <div className="rounded-2xl border border-green-100 bg-white/70 backdrop-blur p-6 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-gray-900">Impact</h3>
              <p className="mt-2 text-gray-700">
                Empowering Ayurveda stakeholders to ensure quality and purity at
                scale.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team grid with subtle motion */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
              Our <span className="text-green-500">Team</span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {teamMembers.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm group-hover:shadow-lg transition-shadow">
                  <div className="aspect-[1/1] relative">
                    <Image src={m.image || "/placeholder.svg"} alt={m.name} fill className="object-cover" />
                  </div>
                </div>
                <p className="mt-3 text-sm text-gray-900 font-medium">{m.name}</p>
                <p
                  className={`text-sm ${m.roleAccent === "green" ? "text-emerald-600" : "text-amber-700"}`}
                >
                  {m.role}
                </p>
                <p className="mt-1 text-xs text-gray-600">{m.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
      `}</style>
    </main>
  )
}
