import Link from "next/link";

export default function IpoPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-b from-slate-950 via-slate-950 to-slate-900 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-20 h-64 w-64 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute right-8 top-64 h-72 w-72 rounded-full bg-amber-400/10 blur-3xl" />
      </div>
      <section
        className="relative mx-auto w-full max-w-7xl space-y-6 px-6 py-16"
        aria-labelledby="ipo-title"
      >
        <header className="space-y-4 rounded-3xl border border-slate-800 bg-linear-to-br from-slate-900/70 to-slate-950 p-8 shadow-lg shadow-slate-900/40">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-200">
            IPO
          </p>
          <h1 id="ipo-title" className="text-4xl font-semibold">
            Invest early in public offerings
          </h1>
          <p className="text-slate-300">
            (IPO) is process where private companies sell their shares to the
            public to raise equity capital from public investors.
          </p>
        </header>

        <ul className="grid gap-4 md:grid-cols-3">
          {["Upcoming IPOs", "Research notes", "Allotment support"].map(
            (item) => (
              <li
                key={item}
                className="rounded-2xl border border-slate-800 bg-linear-to-br from-slate-900/70 to-slate-950 p-4 text-sm"
              >
                {item}
              </li>
            )
          )}
        </ul>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Alerts", value: "Live updates" },
            { label: "Research", value: "In-depth notes" },
            { label: "Support", value: "Allotment help" },
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
                Apply with ease
              </h2>
              <p className="text-sm text-slate-300">
                Get IPO alerts, research, and allotment support from our desk.
              </p>
            </div>
            <nav className="flex flex-wrap gap-3" aria-label="IPO actions">
              <Link
                href="/contact"
                className="rounded-full bg-linear-to-r from-brand-500 via-fuchsia-500 to-amber-400 px-4 py-2 text-sm font-semibold text-white"
              >
                Apply IPO
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
