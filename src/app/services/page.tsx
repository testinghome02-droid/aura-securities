import Link from "next/link";

const services = [
  {
    title: "Mutual Fund",
    description:
      "Invest in mutual fund to grow your wealth with expert-managed portfolios.",
  },
  {
    title: "Demat Account",
    description: "Open a Demat account for seamless stock market investments.",
  },
  {
    title: "Equity",
    description:
      "Equity is a place where shares of company or entities are traded.",
  },
  {
    title: "Commodity",
    description:
      "A commodity is a market that trades in the primary economic sector rather than manufactured products. The primary sector includes agricultural products, energy products, and metals.",
  },
  {
    title: "Future & Option",
    description:
      "Future and option is market where financial derivative used for trading asset (like stocks, indices or commodities) at predetermined price on future date.",
  },
  {
    title: "IPO",
    description:
      "(IPO) is process where private companies sell their shares to the public to raise equity capital from the public investors.",
  },
  {
    title: "Equity Derivatives",
    description:
      "Equity derivative is a financial instrument whose value is derived from the price movements of an underlying equity asset, such as a stock.",
  },
];

export default function ServicesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-b from-slate-950 via-slate-950 to-slate-900 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute right-10 top-64 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>

      <section
        className="relative mx-auto w-full max-w-7xl space-y-8 px-6 py-16"
        aria-labelledby="services-page-title"
      >
        <header className="space-y-4 rounded-3xl border border-slate-800 bg-linear-to-br from-slate-900/70 to-slate-950 p-8 shadow-lg">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">
            Our Services
          </p>
          <h1 id="services-page-title" className="text-4xl font-semibold">
            Everything you need to invest
          </h1>
          <p className="text-slate-300">
            Explore curated offerings across equity, derivatives, IPOs, demat,
            and mutual funds.
          </p>
        </header>

        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li
              key={service.title}
              className="rounded-2xl border border-slate-800 bg-linear-to-br from-slate-900/70 to-slate-950 p-5 shadow-lg shadow-slate-900/40"
            >
              <h2 className="text-lg font-semibold text-white">
                {service.title}
              </h2>
              <p className="mt-2 text-sm text-slate-300">
                {service.description}
              </p>
            </li>
          ))}
        </ul>

        <section className="grid gap-4 md:grid-cols-3">
          {[
            { label: "Coverage", value: "Mutual Fund, IPO, Equity" },
            { label: "Advisors", value: "Experienced experts" },
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
                Need help choosing a service?
              </h2>
              <p className="text-sm text-slate-300">
                Our advisors can guide you based on your investment goals.
              </p>
            </div>
            <nav className="flex flex-wrap gap-3" aria-label="Services actions">
              <Link
                href="/contact"
                className="rounded-full bg-linear-to-r from-brand-500 via-fuchsia-500 to-amber-400 px-4 py-2 text-sm font-semibold text-white"
              >
                Talk to Advisor
              </Link>
              <Link
                href="/"
                className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-200"
              >
                Back to Home
              </Link>
            </nav>
          </div>
        </section>
      </section>
    </main>
  );
}
