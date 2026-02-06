import Link from "next/link";

type Service = {
  title: string;
  description: string;
};

type ServicesSectionProps = {
  services: Service[];
};

const ServicesSection = ({ services }: ServicesSectionProps) => {
  return (
    <section
      aria-labelledby="services-title"
      className="mx-auto w-full max-w-7xl space-y-8 px-6 py-12"
    >
      <header
        id="services-title"
        className="flex flex-wrap items-center justify-between gap-4"
      >
        <div>
          <h2 id="services-title" className="text-2xl font-semibold text-white">
            Our Services
          </h2>
          <p className="text-sm text-slate-400">
            We're covering Mutual funds, IPOs, Demat Accounts, Equity, Commodity
            and futures trading, and more.
          </p>
        </div>
        <Link
          href="/services"
          className="rounded-full border border-brand-400/50 px-4 py-2 text-sm font-semibold text-brand-100"
        >
          View All Services
        </Link>
      </header>

      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <li
            key={service.title}
            className="group rounded-xl border border-slate-800 bg-linear-to-br from-slate-900/60 to-slate-900/30 p-5 shadow-lg shadow-slate-900/40 transition hover:translate-y-1 hover:border-fuchsia-400/60"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">
                {service.title}
              </h3>
              <span className="text-sm text-fuchsia-200">Learn More</span>
            </div>
            <p className="mt-2 text-sm text-slate-300">{service.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ServicesSection;
