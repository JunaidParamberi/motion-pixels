"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { aboutData } from "@/app/data/site-data";
import bgImg from "../Assets/Images/about-us/bg1.png";

const ParticlesBackground = dynamic(
  () => import("../components/ParticlesBackground"),
  { ssr: false, loading: () => null }
);

const ABOUT_BLUR_PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJyBoZWlnaHQ9JzEwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB2aWV3Qm94PScwIDAgMTAwIDEwMCc+PHJlY3Qgd2lkdGg9JzEwMCcgaGVpZ2h0PScxMDAnIGZpbGw9JyMwMDAwMDAnIC8+PHJlY3QgeD0nLTUnIHk9Jy01JyB3aWR0aD0nMTUwJyBoZWlnaHQ9JzE1MCcgcng9JzIwJyBmaWxsPScjMTMxMzEzJyBvcGFjaXR5PScwLjMnIC8+PC9zdmc+";

const AboutUsPage = () => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="fixed inset-0 -z-20 overflow-hidden [will-change:transform]"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Image
          src={bgImg}
          alt="Background Image"
          className="object-cover w-full h-full"
          placeholder="blur"
          blurDataURL={ABOUT_BLUR_PLACEHOLDER}
          fill
        />
      </motion.div>

      <div className="fixed inset-0 bg-black opacity-70 -z-10" />

      <div className="w-full flex flex-col items-start min-h-screen justify-center gap-8 py-36 container mx-auto px-4">
        <motion.h1
          className="text-white text-7xl font-black text-left"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {aboutData.title}
        </motion.h1>

        <motion.div
          className="flex flex-col gap-8 w-full"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.08, delayChildren: 0.15 },
            },
          }}
        >
          {aboutData.introParagraphs.map((paragraph, i) => (
            <motion.p
              key={i}
              className="max-w-4xl text-lg text-white"
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
                },
              }}
            >
              {paragraph}
            </motion.p>
          ))}

          <motion.blockquote
            className="text-white py-12 flex justify-start"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
              },
            }}
          >
            <div className="max-w-3xl relative pl-6">
              <div className="text-[120px] leading-none font-bold absolute -top-10 left-0 text-white/30">
                “
              </div>
              <p className="text-2xl md:text-3xl font-extrabold italic leading-tight relative z-10 text-left">
                {aboutData.quoteLine1} <br />
                {aboutData.quoteLine2}
              </p>
            </div>
          </motion.blockquote>

          <motion.p
            className="max-w-4xl text-lg text-white"
            variants={{
              hidden: { opacity: 0, y: 16 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
              },
            }}
          >
            {aboutData.processParagraph}
          </motion.p>
        </motion.div>
      </div>

      <ParticlesBackground />
    </motion.div>
  );
};

export default AboutUsPage;
