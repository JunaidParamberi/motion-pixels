"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Logo from "../Assets/Logo/Logo White.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSiteData } from "@/app/contexts/SiteDataContext";

const SCROLL_THRESHOLD = 8;

const NAVBAR_HEIGHT_CSS_VAR = "--navbar-height";

const Navbar = () => {
  const pathName = usePathname();
  const { navLinks } = useSiteData();
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const navbarBarRef = useRef<HTMLDivElement>(null);
  const [clipOrigin, setClipOrigin] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const setNavbarHeight = () => {
      if (navbarBarRef.current) {
        const height = navbarBarRef.current.offsetHeight;
        document.documentElement.style.setProperty(NAVBAR_HEIGHT_CSS_VAR, `${height}px`);
      }
    };
    setNavbarHeight();
    window.addEventListener("resize", setNavbarHeight);
    return () => window.removeEventListener("resize", setNavbarHeight);
  }, []);

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

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const scrollY = window.scrollY;
    const { style: bodyStyle } = document.body;
    const { style: htmlStyle } = document.documentElement;

    const prevBodyOverflow = bodyStyle.overflow;
    const prevBodyPosition = bodyStyle.position;
    const prevBodyTop = bodyStyle.top;
    const prevBodyWidth = bodyStyle.width;
    const prevBodyTouchAction = bodyStyle.touchAction;
    const prevHtmlOverflow = htmlStyle.overflow;

    bodyStyle.overflow = "hidden";
    bodyStyle.position = "fixed";
    bodyStyle.top = `-${scrollY}px`;
    bodyStyle.width = "100%";
    bodyStyle.touchAction = "none";
    htmlStyle.overflow = "hidden";

    return () => {
      bodyStyle.overflow = prevBodyOverflow;
      bodyStyle.position = prevBodyPosition;
      bodyStyle.top = prevBodyTop;
      bodyStyle.width = prevBodyWidth;
      bodyStyle.touchAction = prevBodyTouchAction;
      htmlStyle.overflow = prevHtmlOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [isMobileMenuOpen]);

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

  useEffect(() => {
    if (isMobileMenuOpen) setShowNavbar(true);
  }, [isMobileMenuOpen]);

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
        <div
          ref={navbarBarRef}
          className="container mx-auto px-4 sm:px-6 flex justify-between items-center h-16 md:h-18"
        >
          <Link
            href="/"
            className="flex items-center shrink-0 transition-opacity hover:opacity-90"
            aria-label="Motion Pixels Home"
          >
            <Image
              src={Logo}
              alt="Logo"
              width={250}
              height={40}
              className="w-[190px] sm:w-[230px] md:w-[250px] h-auto"
            />
          </Link>

          <button
            ref={hamburgerRef}
            type="button"
            className="md:hidden p-2.5 -mr-2 text-white/90 hover:text-white border border-white/20 bg-black/20 backdrop-blur-sm transition-colors focus:outline-none focus:ring-2 focus:ring-white/30 z-50"
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
                      className={"group relative px-4 py-2 text-[13px] font-medium uppercase tracking-wider transition-colors duration-200 " + linkClass}
                    >
                      <span className="relative z-10">{link.name}</span>
                      <span
                        className={"absolute bottom-0 left-4 right-4 h-px bg-white transition-all duration-300 origin-left " + underlineClass}
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
                    className={"group relative px-5 py-2.5 text-[13px] font-medium uppercase tracking-wider transition-colors duration-200 shrink-0 " + linkClass}
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
            className="fixed inset-0 z-40 bg-black text-white"
            initial={{
              clipPath: `circle(0% at ${clipOrigin.x}px ${clipOrigin.y}px)`,
              opacity: 0.7,
            }}
            animate={{
              clipPath: `circle(150% at ${clipOrigin.x}px ${clipOrigin.y}px)`,
              opacity: 1,
              transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
            }}
            exit={{
              clipPath: `circle(0% at ${clipOrigin.x}px ${clipOrigin.y}px)`,
              opacity: 0.7,
              transition: { duration: 0.35, ease: [0.33, 1, 0.68, 1] },
            }}
          >
            <div className="relative h-full w-full max-w-md mx-auto px-7 pt-24 pb-10 flex flex-col overflow-hidden">
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, duration: 0.25 }}
                className="text-[10px] uppercase tracking-[0.35em] text-white/45"
              >
                Navigation
              </motion.div>

              <nav className="mt-10 space-y-3">
                {navLinks.map((link, i) => {
                  const active = isActive(link.href);
                  return (
                    <motion.div
                      key={link.name}
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.12 + i * 0.06, duration: 0.28 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`group flex items-center justify-between border-b border-white/10 py-3 ${
                          active ? "text-white" : "text-white/75"
                        }`}
                      >
                        <span className="text-2xl leading-none font-semibold tracking-[0.04em] uppercase">
                          {link.name}
                        </span>
                        <span className="text-xs tracking-[0.25em] text-white/40 group-hover:text-white/80 transition-colors">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.28 }}
                className="mt-auto"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="inline-flex w-full items-center justify-center border border-white/45 px-8 py-4 text-sm uppercase tracking-[0.26em] font-medium text-white hover:bg-white hover:text-black transition-colors duration-200"
                >
                  Start Project
                </Link>
                <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-white/35 text-center">
                  Let&apos;s build something cinematic
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
