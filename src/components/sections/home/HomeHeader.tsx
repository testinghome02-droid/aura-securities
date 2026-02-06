import Link from "next/link";

type NavItem = { label: string; href: string };

type HomeHeaderProps = {
  navItems: NavItem[];
};

export default function HomeHeader({ navItems }: Readonly<HomeHeaderProps>) {
  return (
    <header>
      {/* Top Info Bar */}
      <div className="border-b border-slate-800/60 bg-slate-950/80">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-2 text-xs text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <span>SEBI Registered</span>
            <span className="hidden sm:inline">|</span>
            <span>Sales • Service • Support</span>
          </div>

          <div className="hidden items-center gap-4 sm:flex">
            <span className="flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 text-slate-400"
                aria-hidden="true"
              >
                <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C9.39 21 3 14.61 3 6a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.46.57 3.58a1 1 0 0 1-.24 1.01l-2.2 2.22" />
              </svg>
              +91 82694 09372
            </span>
            <span className="hidden md:flex items-center gap-2">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-4 w-4 text-slate-400"
                aria-hidden="true"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM20 8l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              hr@aurasecurities@gmail.com
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-slate-800/60 bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-brand-500/50 via-fuchsia-500/40 to-emerald-500/20 text-sm font-semibold text-white shadow-lg shadow-brand-500/40 ring-1 ring-white/10">
              AS
            </div>
            <div>
              <div className="text-base font-semibold text-white">
                Aura Securities
              </div>
              <div className="text-xs text-slate-400">
                Premium Broking Services
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-5 text-sm text-slate-300 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative transition hover:text-white"
              >
                <span className="relative">
                  {item.label}
                  <span className="absolute -bottom-2 left-0 h-0.5 w-0 rounded-full bg-linear-to-r from-brand-500 via-fuchsia-500 transition-all duration-300 group-hover:w-full" />
                </span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden rounded-full border border-slate-700/80 bg-slate-900/60 px-4 py-2 text-sm text-slate-200 hover:border-slate-500 md:inline-flex">
              Client Login
            </button>
            <Link
              href="/contact"
              className="rounded-full bg-linear-to-r from-brand-500 via-fuchsia-500 to-amber-400 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 hover:opacity-90"
            >
              Open Account
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
