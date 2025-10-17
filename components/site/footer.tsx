export function SiteFooter() {
  return (
    <footer className="mt-8 sm:mt-12 lg:mt-16 bg-(--color-brand) text-(--color-bg) border-t-4 border-(--color-saffron)">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-4 py-8 sm:py-10 lg:py-12 grid gap-6 sm:gap-8 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
        {/* Brand Section */}
        <div className="text-center sm:text-left lg:col-span-1">
          <h4 className="font-serif text-lg sm:text-xl font-bold">Aayuwave</h4>
          <p className="mt-2 text-(--color-bg)/80 text-sm sm:text-base max-w-xs mx-auto sm:mx-0">
            The E-Tongue Intelligence for Ayurveda.
          </p>
        </div>

        {/* Quick Links */}
        <div className="text-center sm:text-left">
          <h5 className="font-semibold text-base sm:text-base">Quick Links</h5>
          <ul className="mt-2 sm:mt-3 space-y-1 text-sm sm:text-base">
            {["Home", "Herbs", "Remedies", "Measure", "History"].map((t) => (
              <li key={t}>
                <a
                  className="hover:underline underline-offset-4 decoration-(--color-saffron) transition-colors hover:text-(--color-bg)/90"
                  href="#"
                >
                  {t}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div className="text-center sm:text-left">
          <h5 className="font-semibold text-base sm:text-base">Resources</h5>
          <ul className="mt-2 sm:mt-3 space-y-1 text-sm sm:text-base">
            {["Docs", "API", "Blog", "Help"].map((t) => (
              <li key={t}>
                <a
                  className="hover:underline underline-offset-4 decoration-(--color-saffron) transition-colors hover:text-(--color-bg)/90"
                  href="#"
                >
                  {t}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="text-center sm:text-left">
          <h5 className="font-semibold text-base sm:text-base">Contact</h5>
          <div className="mt-2 sm:mt-3 space-y-2 sm:space-y-1">
            <div>
              <a
                href="mailto:aetheraayurwave@gmail.com"
                className="hover:underline underline-offset-4 decoration-(--color-saffron) text-sm sm:text-base transition-colors hover:text-(--color-bg)/90"
              >
                aetheraayurwave@gmail.com
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-2 mt-3 sm:mt-2 justify-center sm:justify-start">
              {["X", "LI", "IG"].map((k) => (
                <button
                  key={k}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-(--color-bg)/10 border border-(--color-bg)/30 hover:bg-(--color-bg)/20 transition-colors text-xs sm:text-sm font-medium"
                  aria-label={`Follow us on ${k === 'X' ? 'Twitter' : k === 'LI' ? 'LinkedIn' : 'Instagram'}`}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center text-xs sm:text-sm py-3 sm:py-4 bg-(--color-brand-700) px-4">
        <p>© {new Date().getFullYear()} Aayuwave. All rights reserved.</p>
      </div>
    </footer>
  );
}
