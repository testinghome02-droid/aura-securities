export type NavItem = {
  label: string;
  href: string;
};

export type ServiceItem = {
  title: string;
  description: string;
};

export type HighlightItem = {
  title: string;
  description: string;
};

export type TestimonialItem = {
  name: string;
  role: string;
  quote: string;
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Mutual Fund", href: "/mutual-fund" },
  { label: "IPO", href: "/ipo" },
  { label: "Demat & Trading", href: "/demat-trading" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

export const services: ServiceItem[] = [
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
      "Equity trading services to help you buy and sell stocks efficiently.",
  },
  {
    title: "Commodity",
    description:
      "A commodity is a market that trades in primary economic sector rather than manufactured products. The primary commodities are natural resources such as oil, gold, and agricultural products like wheat, coffee, energy, and metals.",
  },
  {
    title: "Futures & Options",
    description:
      "Futures and options are financial derivatives that provide investors with tools for hedging, speculation, and leveraging their positions in various asset classes.",
  },
  {
    title: "IPO",
    description:
      "Get access to the latest IPOs and invest early in promising companies.",
  },
  {
    title: "Equity Derivatives",
    description:
      "Trade equity derivatives to diversify your investment portfolio and manage risk.",
  },
];

export const highlights: HighlightItem[] = [
  {
    title: "Qualified Experts",
    description:
      "Our team consists of highly qualified experts with years of experience in the financial industry.",
  },
  {
    title: "Personalized Advice",
    description: "Get personalized investment advice from our team of experts.",
  },
  {
    title: "Quality is everything we do",
    description:
      "We prioritize quality in all our services to ensure the best outcomes for our clients.",
  },
  {
    title: "Secure Transactions",
    description:
      "Experience safe and secure transactions with our advanced security measures.",
  },
  {
    title: "Comprehensive Research",
    description:
      "Access in-depth market research and analysis to make informed decisions.",
  },
];

export const testimonials: TestimonialItem[] = [
  {
    name: "Ankit Lodhi",
    role: "Director at Aura Securities",
    quote:
      "Aura Securities has transformed my investment journey with their expert advice and seamless services.",
  },
  {
    name: "Riya Mehta",
    role: "Long-term Investor",
    quote:
      "Thanks to Aura Securities, I've been able to build a diversified portfolio that aligns with my financial goals.",
  },
  {
    name: "Karan Verma",
    role: "Stock Trader",
    quote:
      "The user-friendly platform and real-time market insights provided by Aura Securities have greatly enhanced my trading experience.",
  },
  {
    name: "Ishika Sugandhi",
    role: "Manager",
    quote:
      "Working with Aura Securities has been a game-changer for my financial planning. Their team is knowledgeable and always ready to assist.",
  },
  {
    name: "Sneha Kapoor",
    role: "Trader",
    quote:
      "I appreciate the comprehensive research and secure transactions offered by Aura Securities, making my trading experience smooth and reliable.",
  },
];

export const partnership: string[] = [
  "Quality is Everything We Do Sales,Service & Support",
  "Our Services",
  "Demat Account",
  "Mutual Funds",
  "commodity Trading",
  "IPO Services",
  "Equity & Derivatives",
  "Commodity Trading",
];
