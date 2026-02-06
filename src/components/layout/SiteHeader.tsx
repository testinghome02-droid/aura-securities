import React from "react";
import { HomeHeader } from "../sections/home";
import { navItems } from "src/lib/data";

const SiteHeader = () => {
  return <HomeHeader navItems={navItems} />;
};

export default SiteHeader;
