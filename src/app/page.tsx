import {
  AboutSection,
  DematBenefitsSection,
  HeroSection,
  HomeFooter,
  PartnershipSection,
  ServicesSection,
  TestimonialsSection,
  TradingAccountSection,
} from "../components/sections/home";
import { highlights, partnership, services, testimonials } from "../lib/data";

export default function HomePage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-b form-slate-950 via-slate-950 to-slate-900 text-white">
      <div className="pointer-events-none absolute inset-0 ">
        <div className="absolute -left-32 top-24 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl" />
        <div className="absolute right-0 top-64 h-80 w-80 rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>
      <div className="relatiive">
        <HeroSection highlights={highlights} />
        <DematBenefitsSection
          benefits={[
            "Instant Settlement",
            "Enhanced Security",
            "Easy Portfolio Management",
            "Access to IPOs",
            "Lower Paperwork",
            "Advanced Trading Platform",
            "Expert Support",
            "Comprehensive Research",
            "Secure Transactions",
          ]}
        />
        <ServicesSection services={services} />
        <AboutSection />
        <TradingAccountSection />
        <TestimonialsSection testimonials={testimonials} />
        <PartnershipSection partnership={partnership} />
        <HomeFooter />
      </div>
    </main>
  );
}
