"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

export function ETongueSection() {
  return (
    <section id="measure" className="px-4 lg:px-16 bg-white lg:bg-green-100 mt-6">
      <div className="mx-auto h-auto lg:h-[600px] px-4 py-12 lg:py-16 grid gap-8 lg:grid-cols-2 items-center">
        {/* Left (always present) */}
        <div className="self-center">
          <h2
            className="font-serif text-3xl md:text-4xl font-bold"
            style={{ color: "var(--color-deep, #0f172a)" }}
          >
            The <span className="text-blue-500">E-Tongue</span> Intelligence for
            Ayurveda
          </h2>

          <p
            className="mt-4 leading-relaxed max-w-prose"
            style={{ color: "var(--color-deep, #0f172a)", opacity: 0.85 }}
          >
            Our AI models interpret rasa (taste profiles) captured by e-tongue
            sensors to identify herb quality and potential adulteration. Receive
            clear, actionable insights to improve formulations and ensure
            consistency across batches.
          </p>

          <Link
            href="/dashboard"
            className="mt-6 inline-flex items-center justify-center rounded-xl px-5 h-11 shadow-sm hover:shadow-md transition-shadow focus:outline-none focus-visible:ring-2"
            style={{
              
              color: "var(--color-bg, #000)",
            }}
            aria-label="Start measuring"
          >
            Start Measuring
          </Link>
        </div>

        {/* Right placeholder image — ONLY rendered on lg+ (desktop). Kept the filename exactly as you had. */}
        <div className="hidden lg:flex relative aspect-[7/3] bg-green-100 rounded-b-full p-11 items-center justify-center">
          <Image
            src="/images/tounge.png"
            alt="Herbal and AI fusion concept"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>
      </div>
    </section>
  );
}
