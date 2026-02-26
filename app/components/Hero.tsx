"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import coverImg from "../Assets/Images/Home/Cover_1.jpg";
import { heroData } from "@/app/data/site-data";
import "@/public/fonts/Neusharp/Neusharp-Black.css";

const HERO_BLUR_PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJyBoZWlnaHQ9JzEwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB2aWV3Qm94PScwIDAgMTAwIDEwMCc+PHJlY3Qgd2lkdGg9JzEwMCcgaGVpZ2h0PScxMDAnIGZpbGw9JyMwMDAwMDAnIC8+PHJlY3QgeD0nLTUnIHk9Jy01JyB3aWR0aD0nMTUwJyBoZWlnaHQ9JzE1MCcgcng9JzIwJyBmaWxsPScjMTMxMzEzJyBvcGFjaXR5PScwLjMnIC8+PC9zdmc+";

const Hero = () => {
  return (
    <motion.div
      className="relative h-screen w-full hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Image
          src={coverImg}
          alt="Cover Image"
          className="object-cover w-full h-full"
          priority
          fill
          placeholder="blur"
          blurDataURL={HERO_BLUR_PLACEHOLDER}
        />
      </motion.div>
      <div className="container mx-auto px-4 flex flex-col items-start justify-center h-full space-y-6 z-10 relative">
        <motion.h1
          className="text-white text-left font-extrabold uppercase z-20 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {heroData.titleLine1} <br /> {heroData.titleLine2}
        </motion.h1>
      </div>
    </motion.div>
  );
};

export default Hero;
