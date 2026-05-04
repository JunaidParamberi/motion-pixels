"use client";
import React from "react";
import { motion } from "framer-motion";
import { aboutData } from "@/app/data/site-data";
import PageContainer from "../components/PageContainer";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] as const },
});

const AboutUsPage = () => {
  return (
    <PageContainer className="flex flex-col">

      {/* ── Hero ─────────────────────────────────────────── */}
      <motion.section className="pb-16 border-b border-white/10" {...fadeUp(0)}>
        <span className="block text-[10px] tracking-[0.45em] text-white/30 uppercase mb-8">
          Studio — Motion Pixels
        </span>
        <h1
          className="font-black text-white leading-none tracking-tight"
          style={{ fontSize: "clamp(3.5rem, 9vw, 7.5rem)" }}
        >
          About
          <br />
          Us<span className="text-white/15">.</span>
        </h1>
      </motion.section>

      {/* ── Who We Are — two equal columns ───────────────── */}
      <motion.section className="py-16 border-b border-white/10" {...fadeUp(0.15)}>
        <div className="flex items-center gap-4 mb-10">
          <span className="text-[9px] tracking-[0.5em] text-white/25 uppercase">01</span>
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[10px] tracking-[0.35em] text-white/35 uppercase">Who We Are</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {aboutData.introParagraphs.map((paragraph, i) => (
            <motion.p
              key={i}
              className="text-white/65 text-base md:text-lg leading-relaxed"
              {...fadeUp(0.2 + i * 0.1)}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </motion.section>

      {/* ── Quote — full width ───────────────────────────── */}
      <motion.section className="py-20 border-b border-white/10" {...fadeUp(0.3)}>
        <blockquote className="w-full">
          <p
            className="text-white font-black italic leading-[1.15] tracking-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
          >
            &ldquo;{aboutData.quoteLine1}
            <br />
            {aboutData.quoteLine2}&rdquo;
          </p>
        </blockquote>
      </motion.section>

      {/* ── Our Process — full width ─────────────────────── */}
      <motion.section className="py-16" {...fadeUp(0.4)}>
        <div className="flex items-center gap-4 mb-10">
          <span className="text-[9px] tracking-[0.5em] text-white/25 uppercase">02</span>
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[10px] tracking-[0.35em] text-white/35 uppercase">Our Process</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <p className="text-white/65 text-base md:text-lg leading-relaxed">
            {aboutData.processParagraph}
          </p>
          <div className="hidden lg:flex flex-col justify-between gap-8 border-l border-white/10 pl-16">
            {[
              { num: "07+", label: "Years of Experience" },
              { num: "120+", label: "Projects Delivered" },
              { num: "3", label: "Core Disciplines" },
            ].map(({ num, label }) => (
              <div key={label}>
                <p className="text-white font-black leading-none tracking-tight" style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)" }}>
                  {num}
                </p>
                <p className="text-white/35 text-xs tracking-[0.3em] uppercase mt-2">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <div className="border-t border-white/10" />
    </PageContainer>
  );
};

export default AboutUsPage;
