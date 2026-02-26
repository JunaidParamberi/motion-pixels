"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Logo from "../Assets/Logo/Logo White.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteData } from "@/app/contexts/SiteDataContext";

const SCROLL_THRESHOLD = 8;

const Navbar = () => {
  const pathName = usePathname();
  const { navLinks } = useSiteData();
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const [clipOrigin, setClipOrigin] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY =
        document.documentElement.scrollTop || window.scrollY;
      if (currentScrollY <= 0) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY.current + SCROLL_THRESHOLD) {
        setShowNavbar(false);
      } else if (currentScrollY < lastScrollY.current - SCROLL_THRESHOLD) {
        setShowNavbar(true);
      }
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathName === href;
    return pathName === href || pathName.startsWith(`${href}/`);
  };

  const handleHamburgerClick = () => {
    if (hamburgerRef.current) {
      const rect = hamburgerRef.current.getBoundingClientRect();
      setClipOrigin({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
    }
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={false}
      animate={{
        y: showNavbar ? 0 : "-100%",
      }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
    >
      {/* Gradient extends below the bar so it blends into the page */}
      <div
        className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/85 via-black/30 to-transparent pointer-events-none"
        aria-hidden
      />
      <div className="relative">
        <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center h-16 md:h-18">
          <Link
            href="/"
            className="flex items-center shrink-0 transition-opacity hover:opacity-90"
            aria-label="Motion Pixels Home"
          >
            <Image src={Logo} alt="Logo" width={250} height={40} />
          </Link>

          <button
            ref={hamburgerRef}
            type="button"
            className="md:hidden p-2 -mr-2 text-white/90 hover:text-white transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 z-50"
            onClick={handleHamburgerClick}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <div className="hidden md:flex items-center justify-between flex-1 max-w-2xl ml-12">
            <nav className="flex items-center gap-1">
              {navLinks
                .filter((link) => link.name !== "Contact")
                .map((link) => {
                  const active = isActive(link.href);
                  const linkClass = "text-white/90 hover:text-white";
                  const underlineClass = active
                    ? "opacity-100 scale-x-100"
                    : "opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100";
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={"group relative px-4 py-2 text-[13px] font-medium uppercase tracking-wider transition-colors duration-200 rounded-xl " + linkClass}
                    >
                      <span className="relative z-10">{link.name}</span>
                      <span
                        className={"absolute bottom-0 left-4 right-4 h-px bg-white transition-all duration-300 origin-left rounded-full " + underlineClass}
                        aria-hidden
                      />
                    </Link>
                  );
                })}
            </nav>
            {navLinks
              .filter((link) => link.name === "Contact")
              .map((link) => {
                const active = isActive(link.href);
                const linkClass = active
                  ? "bg-white text-black"
                  : "text-white/90 hover:text-white border border-white/30 hover:border-white/60 hover:bg-white/10";
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={"group relative px-5 py-2.5 text-[13px] font-medium uppercase tracking-wider transition-colors duration-200 rounded-xl shrink-0 " + linkClass}
                  >
                    <span className="relative z-10">{link.name}</span>
                    <span className="absolute bottom-0 left-4 right-4 h-px hidden" aria-hidden />
                  </Link>
                );
              })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black text-white flex flex-col items-center justify-center gap-10 z-40"
            initial={{
              clipPath: `circle(0% at ${clipOrigin.x}px ${clipOrigin.y}px)`,
            }}
            animate={{
              clipPath: `circle(150% at ${clipOrigin.x}px ${clipOrigin.y}px)`,
              transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
            }}
            exit={{
              clipPath: `circle(0% at ${clipOrigin.x}px ${clipOrigin.y}px)`,
              transition: { duration: 0.35, ease: [0.33, 1, 0.68, 1] },
            }}
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.25 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-lg uppercase tracking-[0.25em] font-medium transition-opacity hover:opacity-80 ${
                      isActive(link.href) ? "text-white" : "text-white/80"
                    }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center justify-center rounded-full border border-white/50 px-8 py-3 text-sm uppercase tracking-[0.2em] font-medium text-white hover:bg-white hover:text-black transition-colors duration-200"
              >
                Start Project
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
