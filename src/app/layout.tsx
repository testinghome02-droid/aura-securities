import "./globals.css";
import type { Metadata } from "next";
import { HomeHeader } from "../components/sections/home";
import StickySocials from "../components/ui/StickySocials";
import { navItems } from "../lib/data";

export const metadata: Metadata = {
  title: "Aura Securities | Stock Broking",
  description: "Aura Securities - Your Trusted Partner in Stock Broking",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <HomeHeader navItems={navItems} />
        <StickySocials />
        {children}
      </body>
    </html>
  );
}
