import Link from "next/link";

export default function DematTradingPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-b from-slate-950 via-slate-950 to-slate-900 text-white">
      {/* Background Glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute right-8 top-72 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <section
        className="relative mx-auto w-full max-w-7xl space-y-6 px-6 py-16"
        aria-labelledby="demat-title"
      >
        <header className="space-y-4 rounded-3xl border border-slate-800 bg-linear-to-br from-slate-900/70 to-slate-950 p-8 shadow-lg shadow-slate-900/40">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-200">
            Demat & Trading
          </p>
          <h1 id="demat-title" className="text-4xl font-semibold">
            Open your Demat & Trading account
          </h1>
          <p className="text-slate-300">
            A Demat account offers easy share transfers, enhanced security,
            reduced paperwork, and quicker transactions.
          </p>
        </header>

        <ul className="grid gap-4 md:grid-cols-3">
          {["Fast KYC", "Zero paperwork", "Secure holdings"].map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-slate-800 bg-linear-to-br from-slate-900/70 to-slate-950 p-4 text-sm"
            >
              {item}
            </li>
          ))}
        </ul>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Account Type", value: "Demat + Trading" },
            { label: "Onboarding", value: "Fast & Secure" },
            { label: "Support", value: "Dedicated team" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-800 bg-slate-900/60 px-5 py-4"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                {stat.label}
              </p>
              <p className="mt-2 text-sm font-semibold text-white">
                {stat.value}
              </p>
            </div>
          ))}
        </section>

        <section className="rounded-3xl border border-slate-800 bg-linear-to-br from-slate-900/70 to-slate-950 p-6 shadow-lg shadow-slate-900/40">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Open your account today
              </h2>
              <p className="text-sm text-slate-300">
                Seamless onboarding, secure holdings, and fast approvals.
              </p>
            </div>
            <nav className="flex flex-wrap gap-3" aria-label="Demat actions">
              <Link
                href="/contact"
                className="rounded-full bg-linear-to-r from-brand-500 via-fuchsia-500 to-amber-400 px-4 py-2 text-sm font-semibold text-white"
              >
                Open Account
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200"
              >
                View Services
              </Link>
            </nav>
          </div>
        </section>
      </section>
    </main>
  );
}
