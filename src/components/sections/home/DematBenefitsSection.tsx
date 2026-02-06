type DematBenefitsSectionProps = {
  benefits: string[];
};

export default function DematBenefitsSection({
  benefits,
}: Readonly<DematBenefitsSectionProps>) {
  return (
    <section
      className="mx-auto w-full max-w-7xl space-y-6 px-6 pb-10"
      aria-labelledby="demat-benefits-title"
    >
      <div className="rounded-3xl border border-slate-800 bg-linear-to-br from-slate-900/60 via-slate-900/30 to-slate-950 p-8 shadow-lg shadow-slate-900/40">
        <h2
          id="demat-benefits-title"
          className="text-2xl font-semibold text-white"
        >
          Demat account offers several benefits
        </h2>

        <p className="mt-3 text-sm text-slate-300">
          Easy share transfers, enhanced security, reduced paperwork, and
          quicker transactions—eliminating the risks associated with physical
          share certificates.
        </p>

        <ul className="mt-6 grid gap-4 md:grid-cols-4">
          {benefits.map((item) => (
            <li
              key={item}
              className="rounded-2xl border border-slate-800/80 bg-slate-950/70 px-4 py-3 text-sm text-slate-200"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
