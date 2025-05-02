"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../Assets/Logo/Logo White.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY =
        document.documentElement.scrollTop || window.scrollY;

      if (currentScrollY === 0) {
        setShowNavbar(true); // Ensure navbar is always visible at the top
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

  return (
    <div
      className={`fixed z-10 top-0 left-0 w-full bg-gradient-to-b from-[#000000c9] to-transparent bg-opacity-50 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } `}
    >
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center cursor-pointer">
          <Image src={Logo} alt="Logo" width={250} height={40} />
        </Link>

        {/* Navigation Links */}
        <nav className="flex space-x-16">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-bold text-sm relative group uppercase flex flex-col items-center justify-center gap-1 text-white`}
            >
              <span className="py-2">{link.name}</span>
              <span
                className={`absolute left-0 bottom-0 h-[2px] bg-white transition-all duration-300 ${
                  pathName === link.href ? "w-full " : "w-0 group-hover:w-full"
                }`}
              ></span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
