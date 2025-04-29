import React from "react";
import Image from "next/image";
import Logo from "../Assets/Logo/Logo White.svg";
import Link from "next/link";

const Navbar = () => {
  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Work", href: "#work" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <div className="fixed z-10 top-0 left-0 w-full bg-gradient-to-b from-[#000000c9] to-transparent bg-opacity-50">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src={Logo} alt="Logo" width={300} height={40} />
        </Link>

        {/* Navigation Links */}
        <nav className="flex space-x-16">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-white  font-bold relative group uppercase flex flex-col items-center justify-center gap-1"
            >
              <span className="py-2">{link.name}</span>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
