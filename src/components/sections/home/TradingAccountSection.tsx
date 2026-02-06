import Link from "next/link";

export default function TradingAccountSection() {
  return (
    <section
      className="mx-auto w-full max-w-7xl space-y-6 px-6 py-12"
      aria-labelledby="trading-title"
    >
      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 id="trading-title" className="text-2xl font-semibold text-white">
            Trading Account
          </h2>

          <div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-400">
            <span className="rounded-full border border-slate-800 px-3 py-1">
              Free Demat
            </span>
            <span className="rounded-full border border-slate-800 px-3 py-1">
              Low Brokerage
            </span>
            <span className="rounded-full border border-slate-800 px-3 py-1">
              Mobile Ready
            </span>
          </div>
        </div>
      </header>

      {/* Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Open Now */}
        <article className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/70 to-slate-950 p-6 shadow-lg shadow-slate-900/40">
          <h3 className="text-lg font-semibold text-white">Open Now</h3>
          <p className="mt-2 text-sm text-slate-300">
            Empower your investments. Experience the freedom of a free demat and
            trading account, unlocking endless opportunities for wealth.
          </p>

          <Link
            href="/demat-trading"
            className="mt-4 inline-flex rounded-full bg-gradient-to-r from-brand-500 via-fuchsia-500 to-amber-400 px-4 py-2 text-xs font-semibold text-white shadow-lg hover:opacity-90"
          >
            Open Now
          </Link>
        </article>

        {/* Mutual Fund */}
        <article className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/70 to-slate-950 p-6 shadow-lg shadow-slate-900/40">
          <h3 className="text-lg font-semibold text-white">Mutual Fund</h3>
          <p className="mt-2 text-sm text-slate-300">
            Build your financial future. Invest in mutual funds for diversified
            portfolios, expert management, and long-term growth.
          </p>

          <Link
            href="/mutual-fund"
            className="mt-4 inline-flex rounded-full border border-brand-400/50 px-4 py-2 text-xs font-semibold text-brand-100 hover:bg-brand-500/10"
          >
            Invest Now
          </Link>
        </article>

        {/* Equity */}
        <article className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/70 to-slate-950 p-6 shadow-lg shadow-slate-900/40">
          <h3 className="text-lg font-semibold text-white">Equity</h3>
          <p className="mt-2 text-sm text-slate-300">
            Build your value insights in the mind of successful investors.
          </p>

          <Link
            href="/services"
            className="mt-4 inline-flex rounded-full border border-brand-400/50 px-4 py-2 text-xs font-semibold text-brand-100 hover:bg-brand-500/10"
          >
            Invest Now
          </Link>
        </article>

        {/* IPO */}
        <article className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/70 to-slate-950 p-6 shadow-lg shadow-slate-900/40">
          <h3 className="text-lg font-semibold text-white">IPO</h3>
          <p className="mt-2 text-sm text-slate-300">
            Discover new investment opportunities. IPOs allow investors to buy
            shares in companies and contribute capital to growing businesses.
          </p>

          <Link
            href="/ipo"
            className="mt-4 inline-flex rounded-full border border-brand-400/50 px-4 py-2 text-xs font-semibold text-brand-100 hover:bg-brand-500/10"
          >
            Apply IPO
          </Link>
        </article>
      </div>
    </section>
  );
}
