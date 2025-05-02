"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Logo from "../Assets/Logo/Logo White.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const pathName = usePathname();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const [clipOrigin, setClipOrigin] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY =
        document.documentElement.scrollTop || window.scrollY;

      if (currentScrollY === 0) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const links = [
    { name: "About", href: "/about-us" },
    { name: "Contact", href: "/contact" },
  ];

  const handleHamburgerClick = () => {
    if (hamburgerRef.current) {
      const rect = hamburgerRef.current.getBoundingClientRect();
      setClipOrigin({
        x: rect.left + rect.width / 2, // Center of the hamburger button
        y: rect.top + rect.height / 2, // Center of the hamburger button
      });
    }
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <div
      className={`fixed z-50 top-0 left-0 w-full bg-gradient-to-b from-[#000000c9] to-transparent bg-opacity-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } `}
    >
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center cursor-pointer">
          <Image src={Logo} alt="Logo" width={250} height={40} />
        </Link>

        {/* Hamburger Icon */}
        <button
          ref={hamburgerRef}
          className="md:hidden text-white focus:outline-none z-50"
          onClick={handleHamburgerClick}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex md:space-x-16">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-bold text-sm relative group uppercase text-white`}
            >
              <span>{link.name}</span>
              <span
                className={`absolute left-0 bottom-0 h-[2px] bg-white transition-all duration-300 ${
                  pathName === link.href ? "w-full" : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile Modal Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black text-white h-screen w-screen flex flex-col items-center justify-center space-y-8 z-40"
            initial={{
              clipPath: `circle(0% at ${clipOrigin.x}px ${clipOrigin.y}px)`, // Start from hamburger button
            }}
            animate={{
              clipPath: `circle(150% at ${clipOrigin.x}px ${clipOrigin.y}px)`, // Expand from the button
              transition: { duration: 0.6, ease: "easeInOut" },
            }}
            exit={{
              clipPath: `circle(0% at ${clipOrigin.x}px ${clipOrigin.y}px)`, // Contract back to button
              transition: { duration: 0.4, ease: "easeInOut" },
            }}
          >
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-xl uppercase font-semibold"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
