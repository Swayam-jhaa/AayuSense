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
    name: "Swayam Jha",
    role: "Backend Infrastructure Engineer",
    description: "Manages backend, database, and API architecture.",
    image: "/images/professional-male-avatar-in-suit.png",
    roleAccent: "green",
  },
  {
    name: "Anup Gupta",
    role: "Experience Design Lead",
    description: "Optimizes user experience and system usability.",
    image: "/images/professional-male-avatar-in-suit.png",
    roleAccent: "green",
  },
  {
    name: "Harshima Joshi",
    role: "Innovation Lead",
    description: "Guides all research and project strategy.",
    image: "/images/Female.png",
    roleAccent: "amber",
  },
  {
    name: "Umesh Pandey",
    role: "Embedded Hardware Engineer",
    description: "Develops sensor integration and microcontroller systems.",
    image: "/images/professional-male-avatar-in-suit.png",
    roleAccent: "green",
  },
  {
    name: "Adarsh Kumar",
    role: "Frontend Application Engineer",
    description: "Builds dashboards and user interfaces.",
    image: "/images/professional-male-avatar-in-suit.png",
    roleAccent: "green",
  },
  {
    name: "Alok Jain",
    role: "Data Science & Modeling Specialist",
    description: "Designs ML models for analysis and predictions",
    image: "/images/professional-male-avatar-in-suit.png",
    roleAccent: "green",
  },
]

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function AboutPage() {
  return (
    <main className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 min-h-screen">
      <TopMinistryBar />
      <Navbar />

      {/* ABOUT: Hero */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="relative overflow-hidden"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <p className="text-sm font-semibold text-orange-600 tracking-wide"></p>
              <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight">
                Ayuwave – The <span className="text-green-500">E‑Tongue Intelligence</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-700 max-w-xl">
                <strong>Sensing Taste, Validating Purity.</strong> At Ayuwave, we bridge ancient Ayurvedic wisdom and modern scientific validation. Our team is committed to solving the most critical challenges facing the herbal industry: the subjective nature of quality assessment.
              </p>
            </div>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="relative w-full max-w-xs mx-auto animate-float "
            >
              <Image
                src="/images/img_hero-sec.png"
                alt="E‑Tongue Intelligence Illustration"
                width={320}
                height={320}
                className="object-contain w-full h-auto rounded-2xl"
                priority
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Challenge & Solution (side-by-side for symmetry) */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="py-6 sm:py-10"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white/70 rounded-2xl shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">The Challenge We Address</h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                In Ayurveda, <strong>Rasa (taste)</strong> is the fundamental criterion for identifying medicinal herbs. Traditional, human-reliant methods are subjective, leading to variability and vulnerability to adulteration. This lack of objective standardization is a major barrier to global trust.
              </p>
            </div>
            <div className="bg-white/70 rounded-2xl shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Our Solution: AI-Integrated E-Tongue</h3>
              <ul className="list-disc ml-4 space-y-1 text-gray-700 text-sm">
                <li><strong>Objective Assessment:</strong> Multi-sensor array mimics human taste for objective detection.</li>
                <li><strong>AI-Powered Analysis:</strong> ML pipeline (PCA, SVM/RF) classifies batch authenticity and quality.</li>
                <li><strong>Smart Alerts:</strong> Threshold detection triggers instant alerts for adulteration and deviations.</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Uniqueness */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="py-6 sm:py-10"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Our Uniqueness</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: "Field-Deployable & Affordable",
                desc: "Powered by cheap microcontrollers and sensors, Ayuwave is budget-friendly and portable for field use.",
              },
              {
                title: "Hybrid Validation",
                desc: "Correlates sensor fingerprints with phytochemical profiling for scientific validation.",
              },
              {
                title: "Future-Ready",
                desc: "Vision to miniaturize onto a single chip, integrated with a mobile app for widespread adoption.",
              },
            ].map((card, idx) => (
              <motion.div
                key={card.title}
                whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(16, 185, 129, 0.12)" }}
                className="rounded-2xl border border-green-100 bg-white/80 backdrop-blur p-5 shadow-md transition-all"
              >
                <h4 className="font-semibold text-gray-900">{card.title}</h4>
                <p className="mt-2 text-gray-700 text-sm">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Innovation & Features */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="py-6 sm:py-10 bg-white/60"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Our Innovation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            {[
              { title: "E-Tongue Sensor Array", desc: "Detects taste modalities electronically (sweet, sour, bitter, etc.)." },
              { title: "Spectral Fingerprint Analysis", desc: "Identifies herbs through their optical signatures." },
              { title: "AI Integration", desc: "Machine learning models for classification and quality scoring." },
              { title: "Future Chip Design", desc: "Miniaturized lab-on-chip for ultra-fast, accurate testing." },
            ].map((feat) => (
              <motion.div
                key={feat.title}
                whileHover={{ scale: 1.03, boxShadow: "0 4px 24px rgba(16, 185, 129, 0.10)" }}
                className="bg-white/90 rounded-xl shadow p-4 transition-all"
              >
                <h4 className="font-semibold">{feat.title}</h4>
                <p className="mt-1 text-sm">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Impact and Vision */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="py-6 sm:py-10"
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Our Impact and Vision</h3>
          <ul className="list-disc ml-6 space-y-1 text-gray-700 text-sm">
            <li><strong>Ayurvedic Industry:</strong> Ensures standardization, compliance, and batch authenticity for global acceptance.</li>
            <li><strong>Startups & Researchers:</strong> Low-cost, accessible tech reduces testing costs and fosters innovation.</li>
            <li><strong>Consumers:</strong> Prevents contamination, ensures purity, and builds trust in traditional remedies.</li>
          </ul>
          <p className="mt-4 text-gray-700 text-sm text-center">Ayuwave is the next wave of quality control, ensuring every herb’s true therapeutic value is sensed and validated.</p>
        </div>
      </motion.section>

      {/* Team grid */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
        className="py-10 sm:py-12"
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-gray-900">
              Our <span className="text-green-500">Team</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 mx-auto mt-3 rounded-full" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {teamMembers.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ scale: 1.05, boxShadow: "0 8px 32px rgba(16, 185, 129, 0.13)" }}
                className="group"
              >
                <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md group-hover:shadow-xl transition-shadow">
                  <div className="aspect-[1/1] relative">
                    <Image src={m.image || "/placeholder.svg"} alt={m.name} fill className="object-cover" />
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-900 font-medium text-center">{m.name}</p>
                <p className={`text-xs text-center ${m.roleAccent === "green" ? "text-emerald-600" : "text-amber-700"}`}>
                  {m.role}
                </p>
                <p className="mt-1 text-xs text-gray-600 text-center">{m.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

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