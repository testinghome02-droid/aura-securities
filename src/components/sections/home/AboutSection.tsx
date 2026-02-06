export default function AboutSection() {
  return (
    <section
      className="mx-auto w-full max-w-7xl space-y-6 px-6 py-12"
      aria-labelledby="about-title"
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* Left Content */}
        <article className="rounded-3xl border border-slate-800 bg-linear-to-br from-slate-900/70 via-slate-900/40 to-slate-950 p-8 shadow-lg shadow-slate-900/40">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-200">
            About Us
          </p>

          <h2
            id="about-title"
            className="mt-3 text-3xl font-semibold text-white"
          >
            Welcome to Aura Securities
          </h2>

          <p className="mt-4 text-sm text-slate-300">
            Aura Securities is a leading broking service provider dedicated to
            delivering exceptional services and support to our valued customers.
            With a focus on reliability, convenience, and customer satisfaction,
            we offer a wide range of services tailored to meet the unique needs
            of individuals and businesses.
          </p>
        </article>

        {/* Right Content */}
        <aside className="space-y-4">
          <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg shadow-slate-900/30">
            <h3 className="text-lg font-semibold text-white">Our Mission</h3>
            <p className="mt-2 text-sm text-slate-300">
              Provide top-notch services that add value to the lives of our
              customers with reliable, innovative, and cost-effective solutions
              while ensuring exceptional support.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-lg shadow-slate-900/30">
            <h3 className="text-lg font-semibold text-white">
              We Provide The Best Policies
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              We help clients build resilient portfolios aligned with their
              long-term goals.
            </p>
          </article>
        </aside>
      </div>
    </section>
  );
}
