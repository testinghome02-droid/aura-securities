type Testomonial = {
  name: string;
  role: string;
  quote: string;
};

type TestimonialsSectionProps = {
  testimonials: Testomonial[];
};

export default function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  return (
    <section
      aria-labelledby="testimonials-title"
      className="mx-auto w-full max-w-7xl space-y-6 py-12"
    >
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2
            id="testimonials-title"
            className="text-2xl font-semibold text-white"
          >
            Testimonials
          </h2>
          <p className="text-slate-300">
            What our customers are talking about us
          </p>
        </div>
        <span className="rounded-full border border-slate-800 px-4 py-2 text-xs text-slate-400">
          4.8/5 client satisfaction
        </span>
      </header>
      <ul className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <li
            key={testimonial.name}
            className="rounded-full border border-slate-800 bg-linear-to-br from-slate-900/70 to-slate-950 p-5 shadow-lg shadow-slate-900/40"
          >
            <p className="text-sm text-slate-300">{testimonial.quote}</p>
            <p className="mt-4 text-sm font-semibold text-white">
              {testimonial.name}
            </p>
            <p className="text-xs text-slate-400">{testimonial.role}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
