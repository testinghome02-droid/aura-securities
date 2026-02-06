const socials = [
  {
    name: "WhatsApp",
    href: "https://wa.me/918269409372",
    gradient: "from-emerald-500/30 to-emerald-500/10",
    border: "border-emerald-400/40",
    text: "text-emerald-200",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12.04 2C6.48 2 2 6.48 2 12.04c0 5.56 4.48 10.04 10.04 10.04 5.56 0 10.04-4.48 10.04-10.04C22.08 6.48 17.6 2 12.04 2zm0 18.08c-4.43 0-8.04-3.61-8.04-8.04S7.61 4 12.04 4c4.43 0 8.04 3.61 8.04 8.04s-3.61 8.04-8.04 8.04z"></path>
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/aura.securities",
    gradient: "from-blue-500/30 to-sky-500/10",
    border: "border-blue-400/40",
    text: "text-blue-200",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M13.5 9.5v4h-3v-4h-1.5v-2h1.5V6.5c0-1.5.5-3 2-3h2v3h-1c-.5 0-1 .5-1 1v1.5h2l-.5 2h-1.5z"></path>
      </svg>
    ),
  },
  {
    name: "Twitter",
    href: "https://twitter.com/aura_securities",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2.04C6.48 2.04 2 6.48 2 12c0 5.56 4.48 10 10 10 5.56 0 10-4.44 10-10 0-5.52-4.48-10-10-10zm0 18.08c-4.43 0-8-3.61-8-8.04S7.57 4 12 4c4.43 0 8 3.61 8 8.04s-3.57 8.04-8 8.04z"></path>
        <path d="M12 6c-3.31 0-6 2.69-6 6 0 3.31 2.69 6 6 6 3.31 0 6-2.69 6-6 0-3.31-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4 0-2.21 1.79-4 4-4 2.21 0 4 1.79 4 4 0 2.21-1.79 4-4 4z"></path>
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/aura-securities",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 2.04C6.48 2.04 2 6.48 2 12c0 5.56 4.48 10 10 10 5.56 0 10-4.44 10-10 0-5.52-4.48-10-10-10zm0 18.08c-4.43 0-8-3.61-8-8.04S7.57 4 12 4c4.43 0 8 3.61 8 8.04s-3.57 8.04-8 8.04z"></path>
        <path d="M12 6c-3.31 0-6 2.69-6 6 0 3.31 2.69 6 6 6 3.31 0 6-2.69 6-6 0-3.31-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4 0-2.21 1.79-4 4-4 2.21 0 4 1.79 4 4 0 2.21-1.79 4-4 4z"></path>
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/aura.securities",
    gradient: "from-pink-500/30 to-fuchsia-500/10",
    border: "border-pink-400/40",
    text: "text-pink-200",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 7.3A4.7 4.7 0 1016.7 12 4.7 4.7 0 0012 7.3zm0 7.7a3 3 0 113-3 3 3 0 01-3 3zm4.8-7.9a1.1 1.1 0 11-1.1-1.1 1.1 1.1 0 011.1 1.1z"></path>
      </svg>
    ),
  },
];

const StickySocials = () => {
  return (
    <div className="fixed top-1/3 left-0 flex flex-col space-y-4 bg-white p-2 rounded-r-lg shadow-lg z-50">
      {socials.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.name}
          className={`group flex h-11 w-11 items-center justify-center rounded-full border bg-linear-to-br ${social.border} ${social.gradient} ${social.text} shadow-lg shadow-slate-900/60 transition hover:scale-105`}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};

export default StickySocials;
