import Link from "next/link";
import OtpForm from "src/components/forms/OtpForm";

type Highlight = {
  title: string;
  description: string;
};

type HeroSectionProps = {
  highlights: Highlight[];
};

export default function HeroSection({
  highlights,
}: Readonly<HeroSectionProps>) {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-title">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.35),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(16,185,129,0.2),transparent_60%)]" />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-16 lg:grid-cols-[1.15fr_0.85fr]">
        {/* LEFT CONTENT */}
        <article className="space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-500/40 bg-linear-to-r from-brand-500/20 via-fuchsia-500/10 to-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-brand-200">
            Trusted Stock Broking
          </p>

          <h1
            id="hero-title"
            className="text-4xl font-semibold leading-tight text-white md:text-5xl"
          >
            Trade smarter with{" "}
            <span className="text-brand-400">Aura Securities</span>
            <br /> reliable broking and investment guidance.
          </h1>

          <p className="text-lg text-slate-300">
            Welcome to Aura Securities, a leading broking service provider
            dedicated to delivering exceptional services and support to our
            valued customers.
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap gap-4" aria-label="Hero actions">
            <Link
              href="/contact"
              className="rounded-full bg-linear-to-r from-brand-500 via-fuchsia-500 to-amber-400 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 hover:opacity-90"
            >
              Start Investing
            </Link>

            <Link
              href="/services"
              className="rounded-full border border-slate-700/80 bg-slate-900/60 px-5 py-3 text-sm text-slate-200 hover:border-brand-300/60"
            >
              Explore Services
            </Link>

            <a
              href="https://wa.me/918269409372"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-5 py-3 text-sm text-emerald-200 hover:border-emerald-300"
            >
              WhatsApp Now
            </a>
          </div>

          {/* HIGHLIGHTS */}
          <ul className="grid gap-4 pt-4 sm:grid-cols-3">
            {highlights.map((item) => (
              <li
                key={item.title}
                className="rounded-2xl border border-slate-800/70 bg-slate-900/60 p-4 shadow-lg shadow-slate-900/30"
              >
                <h3 className="text-sm font-semibold text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-slate-400">
                  {item.description}
                </p>
              </li>
            ))}
          </ul>
        </article>

        {/* RIGHT SIDE – OTP CARD */}
        <aside
          className="rounded-3xl border border-slate-700/70 bg-linear-to-br from-slate-900/70 via-slate-900/40 to-slate-950 p-6 shadow-xl shadow-slate-900/40"
          aria-labelledby="otp-title"
        >
          <h2 id="otp-title" className="text-xl font-semibold text-white">
            Get OTP
          </h2>

          <p className="mt-2 text-sm text-slate-300">
            Enter your mobile number to receive a one-time password.
          </p>

          <div className="mt-4">
            <OtpForm />
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-slate-300">
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2">
              Zero paperwork
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2">
              Secure onboarding
            </div>
            <div className="rounded-xl border border-slate-800 bg-slate-950/80 px-3 py-2">
              Quick approval
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
