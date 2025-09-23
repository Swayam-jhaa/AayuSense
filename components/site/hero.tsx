"use client";

import Image from "next/image";

export function Hero() {
  return (
    <section
      aria-label="Hero"
      className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 -mt-4"
    >
      <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 px-4 sm:px-6 py-8 sm:py-12 lg:py-14">
        {/* Left Content */}
        <div className="lg:col-span-6 self-center space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1">
          <div className="space-y-4 sm:space-y-6">
            <p className="text-sm sm:text-base font-semibold text-orange-600 tracking-wide text-center lg:text-left">
              #1 AI-assisted rasa analysis
            </p>
            <h1 className="font-serif text-balance text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-gray-900 leading-tight text-center lg:text-left">
              <span className="text-green-500">Herbal</span> Without Side{" "}
              <span className="text-amber-950">Effects</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-xl mx-auto lg:mx-0 text-center lg:text-left px-4 sm:px-0">
              Scientifically analyze rasa (taste) and detect possible adulteration
              of herbs using our E-Tongue Intelligence. Make better Ayurvedic
              decisions with confidence.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-3 sm:gap-4 px-4 sm:px-0">
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition-all duration-300 hover:scale-105 font-medium text-base sm:text-lg min-w-[180px]">
              Start Measuring
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
                className="sm:w-5 sm:h-5"
              >
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl border border-gray-300 text-gray-800 hover:bg-gray-50 transition-colors text-base sm:text-lg min-w-[140px]">
              How it works
            </button>
          </div>

          {/* Customer Reviews */}
          <div className="flex items-center justify-center lg:justify-start gap-3 sm:gap-5 pt-4 sm:pt-6 px-4 sm:px-0">
            <div className="flex -space-x-1 sm:-space-x-2">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-green-400 to-green-600 border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs sm:text-sm font-bold">A</span>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs sm:text-sm font-bold">B</span>
              </div>
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-purple-400 to-purple-600 border-2 border-white flex items-center justify-center">
                <span className="text-white text-xs sm:text-sm font-bold">C</span>
              </div>
            </div>
            <div className="space-y-0.5 sm:space-y-1">
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="font-semibold text-gray-900 text-base sm:text-lg">4.9</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="text-yellow-400 fill-current sm:w-[18px] sm:h-[18px]"
                >
                  <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </div>
              <span className="text-sm sm:text-base text-gray-600">
                (110,778 ratings)
              </span>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="lg:col-span-6 relative flex justify-center lg:justify-end order-1 lg:order-2">
          <div className="relative w-full max-w-[280px] sm:max-w-[380px] lg:max-w-[520px]">
            {/* Background decorative circles - hidden on mobile for performance */}
            <div className="absolute -inset-4 sm:-inset-10 pointer-events-none hidden sm:block">
              <div className="absolute right-4 sm:right-10 top-4 sm:top-10 h-48 w-48 sm:h-80 sm:w-80 rounded-full border-2 border-white/30 animate-pulse" />
              <div
                className="absolute right-4 sm:right-10 top-4 sm:top-10 h-56 w-56 sm:h-96 sm:w-96 rounded-full border-2 border-white/20 animate-pulse"
                style={{ animationDelay: "1s" }}
              />
            </div>

            {/* Main Image with optimized loading */}
            <div className="relative animate-float">
              <Image
                src="/images/img_hero-sec.png"
                alt="Two capsules with plant vines growing out"
                width={520}
                height={520}
                className="object-contain w-full h-auto"
                priority
                loading="eager"
                quality={90}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli4ja5LvbkVeCm7wLuvaHZEK9TGFQ2VRW8EaqP7Ry/hfN5ZP9jEXHe4DKtJKj5kSRlxLSkDmUXvx9c/mz4Kfc4rnNFCb6bWsL7Af5oVN3g=="
                sizes="(max-width: 640px) 280px, (max-width: 1024px) 380px, 520px"
              />
            </div>

            {/* Floating elements - simplified for mobile */}
            <div
              className="absolute top-8 sm:top-16 right-6 sm:right-12 w-3 h-3 sm:w-5 sm:h-5 bg-green-300 rounded-full animate-bounce opacity-60"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute top-12 sm:top-24 left-4 sm:left-8 w-2 h-2 sm:w-4 sm:h-4 bg-teal-300 rounded-full animate-bounce opacity-60"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute bottom-12 sm:bottom-24 right-2 sm:right-4 w-4 h-4 sm:w-6 sm:h-6 bg-emerald-300 rounded-full animate-bounce opacity-60"
              style={{ animationDelay: "1.5s" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        
        @media (min-width: 640px) {
          @keyframes float {
            0%,
            100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}