import Link from "next/link";
import ContactForm from "src/components/forms/ContactForm";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-b from-slate-950 via-slate-950 to-slate-900 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-20 h-64 w-64 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute right-10 top-72 h-72 w-72 rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <section
        className="relative mx-auto w-full max-w-7xl space-y-8 px-6 py-16"
        aria-labelledby="contact-title"
      >
        <header className="space-y-4 rounded-3xl border border-slate-800 bg-linear-to-br from-slate-900/70 to-slate-950 p-8 shadow-lg shadow-slate-900/40">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-200">
            Contact Us
          </p>
          <h1 id="contact-title" className="text-4xl font-semibold">
            Let's talk investments
          </h1>
          <p className="text-slate-300">
            Reach Aura Securities for account opening, mutual funds, IPOs, and
            trading support.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-3xl border border-slate-800 bg-linear-to-br from-slate-900/70 to-slate-950 p-6 shadow-lg shadow-slate-900/40">
            <h2 className="text-xl font-semibold text-white">
              Connect instantly
            </h2>
            <address className="mt-4 space-y-3 text-sm text-slate-300 not-italic">
              <p>
                <span className="text-white">Phone:</span> +91 82694 09372
              </p>
              <p>
                <span className="text-white">Email:</span>
                <span className="ml-2">hr@aurasecuritiesgmail.com</span>
              </p>
              <p>
                <span className="text-white">Address:</span> 615, scheme no 64,
                Vikas Rekha near by khatiwala tank
              </p>
            </address>

            <div
              className="mt-6 flex flex-wrap gap-3"
              aria-label="Contact links"
            >
              <a
                href="https://wa.me/918269409372"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-200"
              >
                WhatsApp
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-pink-400/40 bg-pink-500/10 px-4 py-2 text-sm text-pink-200"
              >
                Instagram
              </a>
              <Link
                href="/"
                className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200"
              >
                Back to Home
              </Link>
            </div>
          </article>

          <figure className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 shadow-lg shadow-slate-900/40">
            <iframe
              title="Aura Securities Location"
              className="h-80 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=Vikas%20Rehka%20near%20by%20khatiwala%20tank%20Indore&output=embed"
            />
            <figcaption className="sr-only">
              Aura Securities location map
            </figcaption>
          </figure>
        </div>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            { label: "24/7 Support", value: "Always on" },
            { label: "Fast Response", value: "< 2 hours" },
            { label: "Client Satisfaction", value: "4.8/5" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 px-5 py-4"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                {stat.label}
              </p>
              <p className="mt-2 text-lg font-semibold text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </section>

        <article className="rounded-3xl border border-slate-800 bg-linear-to-br from-slate-900/70 to-slate-950 p-6 shadow-lg shadow-slate-900/40">
          <h2 className="text-xl font-semibold text-white">
            Send a quick request
          </h2>
          <ContactForm />
        </article>
      </section>
    </main>
  );
}
