interface PartnershipSectionProps {
  partnership: string[];
}
const PartnershipSection = ({
  partnership,
}: Readonly<PartnershipSectionProps>) => {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-6 px-6 py-12">
      <h2 id="partnership-title" className="text-2xl font-semibold text-white">
        Partnered with
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {partnership.map((item) => (
          <li
            key={item}
            className="rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-3 text-sm text-slate-200 shadow-md shadow-slate-900/30"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PartnershipSection;
