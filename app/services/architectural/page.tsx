"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  HiCube,
  HiViewGrid,
  HiCollection,
  HiFilm,
  HiCursorClick,
  HiChip,
} from "react-icons/hi";
import architecturalBg from "@/app/Assets/Images/services/Architectural_Img.jpg";
import { architecturalData } from "@/app/data/site-data";

// Parser workaround: use Framer Motion via PascalCase (same API, fixes Turbopack "Unexpected token motion")
const MotionDiv = motion.div;
const MotionSection = motion.section;
const MotionH1 = motion.h1;
const MotionH2 = motion.h2;
const MotionP = motion.p;
const MotionSvg = motion.svg;

const ease = [0.25, 0.46, 0.45, 0.94] as const;
const viewportOnce = { once: true, margin: "-80px", amount: 0.2 };

const GRAIN_SVG =
  "data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E";

const PATTERN_SVG =
  "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

const archCards = architecturalData.items.map((item, i) => {
  const icons = [HiCube, HiViewGrid, HiCollection, HiFilm, HiCursorClick, HiChip];
  const colors = ["primary", "secondary", "indigo", "purple", "blue", "pink"];
  return {
    ...item,
    icon: icons[i],
    color: colors[i],
  };
});

const colorClasses: Record<
  string,
  { bg: string; border: string; text: string; hoverText: string }
> = {
  primary: {
    bg: "bg-indigo-500/20 group-hover:bg-indigo-500/30",
    border: "border-indigo-500/50",
    text: "text-indigo-400",
    hoverText: "group-hover:text-indigo-400",
  },
  secondary: {
    bg: "bg-purple-500/20 group-hover:bg-purple-500/30",
    border: "border-purple-500/50",
    text: "text-purple-400",
    hoverText: "group-hover:text-purple-400",
  },
  indigo: {
    bg: "bg-indigo-500/20 group-hover:bg-indigo-500/30",
    border: "border-indigo-500/50",
    text: "text-indigo-400",
    hoverText: "group-hover:text-indigo-400",
  },
  purple: {
    bg: "bg-purple-500/20 group-hover:bg-purple-500/30",
    border: "border-purple-500/50",
    text: "text-purple-400",
    hoverText: "group-hover:text-purple-400",
  },
  blue: {
    bg: "bg-blue-500/20 group-hover:bg-blue-500/30",
    border: "border-blue-500/50",
    text: "text-blue-400",
    hoverText: "group-hover:text-blue-400",
  },
  pink: {
    bg: "bg-pink-500/20 group-hover:bg-pink-500/30",
    border: "border-pink-500/50",
    text: "text-pink-400",
    hoverText: "group-hover:text-pink-400",
  },
};

const heroStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const ArchitecturalPage = () => {
  return (
    <MotionDiv
      className="relative min-h-screen overflow-x-hidden bg-[#050505] text-slate-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease }}
    >
      {/* Grain overlay */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.05]"
        style={{ backgroundImage: `url("${GRAIN_SVG}")` }}
        aria-hidden
      />

      {/* Glow spots */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <MotionDiv
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-0 -top-[10%] -left-[10%]"
          style={{
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(0, 0, 0, 0) 70%)",
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease }}
        />
        <MotionDiv
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none z-0 top-[40%] -right-[10%]"
          style={{
            background:
              "radial-gradient(circle, rgba(168, 85, 247, 0.1) 0%, rgba(0, 0, 0, 0) 70%)",
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease }}
        />
        <MotionDiv
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-0 -bottom-[10%] left-[20%] opacity-50"
          style={{
            background:
              "radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(0, 0, 0, 0) 70%)",
          }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1, delay: 0.35, ease }}
        />
      </div>

      {/* Hero */}
      <header className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
        {/* Back link - matches pill/glass design */}
        <MotionDiv
          className="absolute top-24 left-0 right-0 z-20 container mx-auto px-6"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease, delay: 0.2 }}
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-slate-200 hover:text-white hover:border-indigo-500/40 hover:bg-white/10 transition-colors duration-300 text-xs font-semibold uppercase tracking-[0.2em]"
          >
            <span aria-hidden>←</span>
            Back to Services
          </Link>
        </MotionDiv>
        <MotionDiv
          className="absolute inset-0 z-0"
          style={{
            maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 50%, transparent 100%)",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease }}
        >
          <Image
            src={architecturalBg}
            alt="Architectural visualization and lighting"
            fill
            className="object-cover opacity-50 mix-blend-screen"
            placeholder="blur"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/30 via-[#050505]/60 to-[#050505]" />
        </MotionDiv>

        <MotionDiv
          className="container mx-auto px-6 relative z-10 text-center mt-[-5vh]"
          variants={heroStagger}
          initial="hidden"
          animate="visible"
        >
          <MotionDiv
            variants={heroItem}
            transition={{ duration: 0.5, ease }}
            className="inline-block mb-6 px-4 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
          >
            <p className="text-indigo-300 tracking-[0.3em] uppercase text-xs font-bold">
              Space, Light & Storytelling
            </p>
          </MotionDiv>
          <MotionH1
            variants={heroItem}
            transition={{ duration: 0.55, ease }}
            className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight mb-6 tracking-tight [text-shadow:0_0_30px_rgba(255,255,255,0.1),0_0_60px_rgba(99,102,241,0.3)]"
          >
            MOTION PIXELS
            <br />
            <span
              className="bg-gradient-to-r from-white to-indigo-400 bg-clip-text text-transparent"
              style={{ WebkitTextFillColor: "transparent" }}
            >
              ARCHITECTURAL
            </span>
          </MotionH1>
          <MotionP
            variants={heroItem}
            transition={{ duration: 0.5, ease }}
            className="max-w-xl mx-auto text-slate-200 text-lg mb-10 font-light leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]"
          >
            High-fidelity visualization, dynamic lighting, and immersive light
            art for spatial storytelling.
          </MotionP>
          <MotionDiv
            variants={heroItem}
            transition={{ duration: 0.5, ease }}
            className="w-px h-16 bg-gradient-to-b from-indigo-500 via-purple-500 to-transparent mx-auto"
          />
        </MotionDiv>

        <MotionDiv
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-slate-200"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 0.9, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease }}
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-slate-200">
            Scroll
          </span>
          <MotionSvg
            className="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 24 24"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
          </MotionSvg>
        </MotionDiv>
      </header>

      {/* Main: side panel + cards */}
      <main className="relative z-10 container mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row gap-20">
          <aside className="lg:w-1/4">
            <MotionDiv
              className="sticky top-32 p-8 rounded-r-2xl rounded-l-sm border-l-2 border-indigo-500/60 bg-white/[0.02] backdrop-blur-[4px]"
              style={{ borderLeftColor: "rgba(99, 102, 241, 0.3)" }}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, ease }}
            >
              <h2 className="text-2xl font-bold text-white mb-6">Our Craft</h2>
              <p className="text-slate-200 text-lg leading-relaxed font-light mb-6">
                At{" "}
                <span className="text-white font-semibold border-b border-indigo-500/50">
                  Motion Pixel
                </span>
                , we collaborate closely with filmmakers and studios to craft
                seamless, photorealistic visual effects for feature films,
                series, and streaming content.
              </p>
              <p className="text-slate-300 text-sm leading-relaxed mb-8">
                Whether it&apos;s world-building, creature animation, or dynamic
                simulations, we turn imagination into reality—frame by frame.
              </p>
              <div className="flex gap-4 mt-auto">
                <MotionDiv
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-indigo-400 bg-[rgba(15,15,20,0.4)] backdrop-blur-[16px] border border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.3)] cursor-default"
                  whileHover={{ scale: 1.05, borderColor: "rgba(99, 102, 241, 0.5)", color: "white" }}
                  transition={{ duration: 0.25, ease }}
                >
                  <HiCube className="text-2xl" />
                </MotionDiv>
                <MotionDiv
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-indigo-400 bg-[rgba(15,15,20,0.4)] backdrop-blur-[16px] border border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.3)] cursor-default"
                  whileHover={{ scale: 1.05, borderColor: "rgba(99, 102, 241, 0.5)", color: "white" }}
                  transition={{ duration: 0.25, ease }}
                >
                  <HiViewGrid className="text-2xl" />
                </MotionDiv>
              </div>
            </MotionDiv>
          </aside>

          <MotionDiv
            className="lg:w-3/4 grid md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.08, delayChildren: 0.1 },
              },
            }}
          >
            {archCards.map((card) => {
              const Icon = card.icon;
              const colors = colorClasses[card.color];
              return (
                <MotionDiv
                  key={card.title}
                  variants={{
                    hidden: { opacity: 0, y: 32 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5, ease }}
                  whileHover={{ y: -6 }}
                  className="group p-10 rounded-2xl relative overflow-hidden bg-[rgba(15,15,20,0.4)] backdrop-blur-[16px] border border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.3)] hover:bg-[rgba(30,30,40,0.5)] hover:border-indigo-500/50 hover:shadow-[0_0_20px_rgba(99,102,241,0.15),inset_0_0_20px_rgba(99,102,241,0.05)] transition-colors duration-300"
                >
                  <div
                    className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-3xl transition-colors duration-500 ${colors.bg}`}
                  />
                  <MotionDiv
                    className={`w-14 h-14 rounded-lg bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:border-current transition-colors ${colors.text}`}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.25 }}
                  >
                    <Icon className="text-3xl" />
                  </MotionDiv>
                  <h3
                    className={`text-2xl font-bold text-white mb-4 uppercase tracking-wide transition-colors ${colors.hoverText}`}
                  >
                    {card.title}
                  </h3>
                  <p className="text-slate-300 leading-relaxed text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)]">
                    {card.description}
                  </p>
                </MotionDiv>
              );
            })}
          </MotionDiv>
        </div>
      </main>

      {/* CTA section */}
      <MotionSection
        className="relative z-10 container mx-auto px-6 py-24 mb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, ease }}
      >
        <MotionDiv
          className="rounded-[2rem] p-12 md:p-24 text-center relative overflow-hidden border border-white/10 bg-[rgba(15,15,20,0.4)] backdrop-blur-[16px] shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, ease }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-[#050505] to-purple-500/20 opacity-40" />
          <div
            className="absolute inset-0 opacity-30"
            style={{ backgroundImage: `url("${PATTERN_SVG}")` }}
          />
          <MotionDiv
            className="relative z-10"
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.1, delayChildren: 0.15 },
              },
            }}
          >
            <MotionH2
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
            >
              Ready to transform your
              <br />
              brand&apos;s digital presence?
            </MotionH2>
            <MotionP
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease }}
              className="text-slate-200 max-w-2xl mx-auto mb-12 text-lg  drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
            >
              Join the pioneers of immersive storytelling. Let&apos;s create an
              experience your customers will never forget.
            </MotionP>
            <MotionDiv
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <MotionDiv whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/contact"
                  className="group relative block px-10 py-4 rounded-full bg-indigo-500 text-white font-bold overflow-hidden shadow-[0_0_30px_rgba(99,102,241,0.4)] hover:shadow-[0_0_50px_rgba(99,102,241,0.6)] transition-shadow duration-300"
                >
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative">START A PROJECT</span>
                </Link>
              </MotionDiv>
              <MotionDiv whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/case-studies"
                  className="group px-10 py-4 rounded-full border border-white/20 text-white font-bold hover:bg-white/5 transition-colors duration-300 flex items-center gap-2"
                >
                  <HiFilm className="text-lg" />
                  <span>VIEW SHOWREEL</span>
                </Link>
              </MotionDiv>
            </MotionDiv>
          </MotionDiv>
        </MotionDiv>
      </MotionSection>
    </MotionDiv>
  );
};

export default ArchitecturalPage;
