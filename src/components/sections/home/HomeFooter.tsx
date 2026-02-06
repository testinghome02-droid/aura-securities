export default function HomeFooter() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950">
      <div className="mx-auto w-full max-w-7xl space-y-8 px-6 py-12 text-sm text-slate-300">
        <div className="grid gap-6 md:grid-cols-3">
          {/* Contact Section */}
          <section aria-labelledby="footer-contact">
            <h3
              id="footer-contact"
              className="text-base font-semibold text-white"
            >
              Contact Us
            </h3>

            <address className="not-italic">
              <p className="mt-2">Contact Number</p>
              <p className="text-white">+91 82694 09372</p>

              <p className="mt-2">Email Address</p>
              <p className="text-white">hr@aurasecuritiesgmail.com</p>
            </address>

            <div className="mt-4 flex flex-wrap gap-2">
              <a
                href="https://wa.me/918269409372"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200 hover:bg-emerald-500/20"
              >
                WhatsApp
              </a>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-pink-400/40 bg-pink-500/10 px-3 py-1 text-xs text-pink-200 hover:bg-pink-500/20"
              >
                Instagram
              </a>
            </div>
          </section>

          {/* Address Section */}
          <section aria-labelledby="footer-address">
            <h3
              id="footer-address"
              className="text-base font-semibold text-white"
            >
              Our Address
            </h3>

            <address className="not-italic">
              <p className="mt-2">
                615, Scheme No. 64, Vikas Rekha Near By Khatiwala Tank
              </p>
            </address>

            <a
              href="https://www.google.com/maps"
              target="_blank"
              rel="noreferrer"
              className="mt-3 inline-flex text-xs text-brand-200 hover:underline"
            >
              View on map
            </a>
          </section>

          {/* Copyright */}
          <section aria-labelledby="footer-copyright">
            <h3
              id="footer-copyright"
              className="text-base font-semibold text-white"
            >
              Copyright
            </h3>

            <p className="mt-2">
              © 2025. All Rights Reserved by Aura Securities
            </p>
          </section>
        </div>
      </div>
    </footer>
  );
}
