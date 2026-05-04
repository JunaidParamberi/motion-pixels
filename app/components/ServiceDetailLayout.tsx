"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronDown, ChevronRight } from "lucide-react";

const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionH2 = motion.h2;
const MotionP = motion.p;

const ease = [0.25, 0.46, 0.45, 0.94] as const;
const viewport = { once: true, margin: "-80px", amount: 0.2 as const };

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

interface ServiceDetailLayoutProps {
  heroImage: StaticImageData;
  heroImageAlt: string;
  heroLabel: string;
  heroTitle: React.ReactNode;
  heroSubtitle: string;
  breadcrumbLabel: string;
  backHref?: string;
  asideParagraphs: [string, string];
  asideIcons: [React.ElementType, React.ElementType];
  cards: Array<{ title: string; description: string; icon: React.ElementType }>;
}

export default function ServiceDetailLayout({
  heroImage,
  heroImageAlt,
  heroLabel,
  heroTitle,
  heroSubtitle,
  breadcrumbLabel,
  backHref = "/services",
  asideParagraphs,
  asideIcons,
  cards,
}: ServiceDetailLayoutProps) {
  const [Icon0, Icon1] = asideIcons;

  return (
    <MotionDiv
      className="relative min-h-screen overflow-x-hidden bg-black text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease }}
    >
      {/* ── Hero ─────────────────────────────────────────── */}
      <header className="relative min-h-screen flex flex-col justify-center overflow-hidden">
        {/* Breadcrumb */}
        <MotionDiv
          className="absolute left-0 right-0 z-20 container mx-auto px-4 sm:px-6"
          style={{ top: "calc(var(--navbar-height, 4rem) + 2rem)" }}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease, delay: 0.2 }}
        >
          <nav className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase">
            <Link
              href={backHref}
              className="inline-flex items-center gap-2 text-white/45 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" />
              What We Do
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/20 shrink-0" />
            <span className="text-white/70">{breadcrumbLabel}</span>
          </nav>
        </MotionDiv>

        {/* Background image — fades to black at bottom */}
        <MotionDiv
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease }}
          style={{
            maskImage: "linear-gradient(to bottom, black 35%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 35%, transparent 100%)",
          }}
        >
          <Image
            src={heroImage}
            alt={heroImageAlt}
            fill
            className="object-cover opacity-30"
            placeholder="blur"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/50 to-black" />
        </MotionDiv>

        {/* Hero text */}
        <MotionDiv
          className="container mx-auto px-4 sm:px-6 relative z-10 pt-32"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <MotionDiv variants={fadeUp} transition={{ duration: 0.45, ease }} className="mb-6">
            <span className="text-[10px] tracking-[0.45em] text-white/30 uppercase">
              {heroLabel}
            </span>
          </MotionDiv>

          <MotionH1
            variants={fadeUp}
            transition={{ duration: 0.55, ease }}
            className="font-black text-white leading-none tracking-tight mb-6"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}
          >
            {heroTitle}
          </MotionH1>

          <MotionP
            variants={fadeUp}
            transition={{ duration: 0.5, ease }}
            className="text-white/50 text-lg max-w-lg leading-relaxed"
          >
            {heroSubtitle}
          </MotionP>
        </MotionDiv>

        {/* Scroll indicator */}
        <MotionDiv
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/25"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <span className="text-[9px] tracking-[0.4em] uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.div>
        </MotionDiv>
      </header>

      {/* ── Content ──────────────────────────────────────── */}
      <main className="container mx-auto px-4 sm:px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">

          {/* Aside */}
          <aside className="lg:w-64 shrink-0">
            <MotionDiv
              className="lg:sticky lg:top-32 border-l border-white/15 pl-7"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{ duration: 0.55, ease }}
            >
              <span className="block text-[10px] tracking-[0.4em] text-white/25 uppercase mb-6">
                Our Craft
              </span>
              <p className="text-white/65 text-sm leading-relaxed mb-4">
                {asideParagraphs[0]}
              </p>
              <p className="text-white/40 text-sm leading-relaxed mb-8">
                {asideParagraphs[1]}
              </p>
              <div className="flex gap-2.5">
                {([Icon0, Icon1] as React.ElementType[]).map((Icon, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 flex items-center justify-center text-white/35 border border-white/[0.07] hover:text-white/65 hover:border-white/18 transition-colors duration-200"
                  >
                    <Icon className="text-lg" />
                  </div>
                ))}
              </div>
            </MotionDiv>
          </aside>

          {/* Feature cards */}
          <MotionDiv
            className="flex-1 grid md:grid-cols-2 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            variants={stagger}
          >
            {cards.map((card, i) => {
              const Icon = card.icon;
              const num = String(i + 1).padStart(2, "0");
              return (
                <MotionDiv
                  key={card.title}
                  variants={fadeUp}
                  transition={{ duration: 0.5, ease }}
                  whileHover={{ y: -4 }}
                  className="group relative p-7 border border-white/[0.07] hover:border-white/15 bg-white/[0.02] hover:bg-white/[0.035] transition-all duration-300 overflow-hidden"
                >
                  {/* Ghost number */}
                  <span className="absolute top-4 right-5 text-white/[0.05] font-black leading-none select-none"
                    style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)" }}>
                    {num}
                  </span>
                  {/* Icon */}
                  <div className="w-9 h-9 flex items-center justify-center text-white/35 border border-white/[0.07] group-hover:text-white/60 group-hover:border-white/18 transition-colors duration-200 mb-5">
                    <Icon className="text-lg" />
                  </div>
                  <h3 className="text-white font-black uppercase tracking-tight text-base mb-2.5 leading-tight pr-8">
                    {card.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </MotionDiv>
              );
            })}
          </MotionDiv>
        </div>
      </main>

      {/* ── CTA ──────────────────────────────────────────── */}
      <MotionDiv
        className="container mx-auto px-4 sm:px-6 pb-24"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.6, ease }}
      >
        <div className="border border-white/10 p-12 md:p-20">
          <div className="flex items-center gap-4 mb-10">
            <span className="text-[9px] tracking-[0.5em] text-white/25 uppercase">Start a Project</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>
          <MotionH2
            className="font-black text-white leading-tight tracking-tight mb-5"
            style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5, ease }}
          >
            Ready to transform your<br />brand&apos;s digital presence?
          </MotionH2>
          <MotionP
            className="text-white/50 max-w-md mb-10 text-base leading-relaxed"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5, ease, delay: 0.1 }}
          >
            Join the pioneers of immersive storytelling. Let&apos;s create an experience your customers will never forget.
          </MotionP>
          <MotionDiv
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5, ease, delay: 0.15 }}
          >
            <Link
              href="/contact"
              className="inline-block px-9 py-3.5 bg-white text-black font-bold text-[11px] tracking-[0.2em] uppercase hover:bg-white/90 transition-colors text-center"
            >
              Start a Project
            </Link>
            <Link
              href="/case-studies"
              className="inline-block px-9 py-3.5 border border-white/20 text-white font-bold text-[11px] tracking-[0.2em] uppercase hover:bg-white/5 transition-colors text-center"
            >
              View Our Work
            </Link>
          </MotionDiv>
        </div>
      </MotionDiv>
    </MotionDiv>
  );
}
