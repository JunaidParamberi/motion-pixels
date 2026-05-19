"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { caseStudyDetails, disabledCaseStudySlugs } from "./case-study-data";
import type { CaseStudyDetail } from "./case-study-data";
import PageContainer from "../components/PageContainer";

type CaseStudyCard = Pick<
  CaseStudyDetail,
  "slug" | "title" | "subtitle" | "tag" | "color" | "cardImage" | "year"
>;

const caseStudyCards: CaseStudyCard[] = Object.values(caseStudyDetails)
  .filter((detail) => !disabledCaseStudySlugs.includes(detail.slug as (typeof disabledCaseStudySlugs)[number]))
  .map((detail) => ({
    slug: detail.slug,
    title: detail.title,
    subtitle: detail.subtitle,
    tag: detail.tag,
    color: detail.color,
    cardImage: detail.cardImage,
    year: detail.year,
  }));

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const CaseStudiesPage = () => {
  return (
    <PageContainer className="flex flex-col">

      {/* ── Header ───────────────────────────────────────── */}
      <motion.section
        className="pb-16 border-b border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
      >
        <span className="block text-[10px] tracking-[0.45em] text-white/30 uppercase mb-8">
          Work — Motion Pixels
        </span>
        <h1
          className="font-black text-white leading-none tracking-tight"
          style={{ fontSize: "clamp(3.5rem, 9vw, 7.5rem)" }}
        >
          Case<br />Studies<span className="text-white/15">.</span>
        </h1>
      </motion.section>

      {/* ── Grid ─────────────────────────────────────────── */}
      <motion.section
        className="py-14"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } },
        }}
      >
        <motion.div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {caseStudyCards.map((item) => (
              <motion.div
                key={item.slug}
                layout
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease },
                  },
                }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="h-full min-h-0"
              >
                <Link
                  href={`/case-studies/${item.slug}`}
                  className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                  data-cursor="zoom"
                >
                  <motion.article
                    className="group flex h-full flex-col overflow-hidden border border-white/[0.08] bg-zinc-950 shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]"
                    whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.16)" }}
                    transition={{ duration: 0.35, ease }}
                  >
                    <div className="relative shrink-0 overflow-hidden">
                      <CaseStudyCardMedia src={item.cardImage} alt={item.title} />
                    </div>

                    <div className="relative flex h-[9.25rem] shrink-0 flex-col justify-between border-t border-white/10 bg-zinc-950 px-3 py-3.5 sm:h-[9.75rem] sm:px-4 sm:py-4">
                      <div className="absolute left-0 top-0 h-full w-0.5 origin-bottom scale-y-0 bg-white/70 transition-transform duration-300 ease-out group-hover:scale-y-100" aria-hidden />
                      <div className="flex h-4 items-center justify-between gap-3">
                        <span className={`${item.color} truncate text-[8px] font-bold tracking-[0.35em] uppercase sm:text-[9px]`}>
                          {item.tag}
                        </span>
                        <span className="shrink-0 text-[8px] tracking-[0.28em] uppercase text-white/55 tabular-nums sm:text-[9px]">
                          {item.year}
                        </span>
                      </div>
                      <div className="flex items-end justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <h3 className="line-clamp-2 min-h-[2.4rem] text-sm font-black uppercase leading-[1.15] tracking-tight text-white sm:min-h-[2.65rem] sm:text-base md:min-h-[2.9rem] md:text-lg">
                            {item.title}
                          </h3>
                          <p className="mt-1.5 line-clamp-2 min-h-[2.25rem] text-xs leading-snug text-white/70 transition-colors duration-300 group-hover:text-white/85 sm:min-h-[2.5rem] sm:text-sm">
                            {item.subtitle}
                          </p>
                        </div>
                        <span className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] text-white/60 transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/[0.08] group-hover:text-white" aria-hidden>
                          <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                        </span>
                      </div>
                    </div>
                  </motion.article>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </motion.section>

    </PageContainer>
  );
};

function CaseStudyCardMedia({ src, alt }: { src: string; alt: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full aspect-[4/3]">
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-white/[0.06]" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        loading="eager"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        onLoadingComplete={() => setIsLoaded(true)}
        className={`object-cover transition-[transform,opacity] duration-700 ease-out group-hover:scale-[1.03] ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

export default CaseStudiesPage;
