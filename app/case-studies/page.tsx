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
        <motion.div className="flex flex-wrap gap-5">
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
                className="w-full sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)] shrink-0"
              >
                <Link href={`/case-studies/${item.slug}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-black" data-cursor="zoom">
                  <motion.article
                    className="group relative overflow-hidden border border-white/[0.08] bg-white/[0.02] shadow-[0_0_0_1px_rgba(255,255,255,0.02)_inset]"
                    whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.16)" }}
                    transition={{ duration: 0.35, ease }}
                  >
                    <CaseStudyCardMedia src={item.cardImage} alt={item.title} />

                    {/* Readability: vignette + bottom weight */}
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20 opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                      aria-hidden
                    />
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-transparent opacity-60"
                      aria-hidden
                    />

                    {/* Top: tag + year */}
                    <div className="absolute top-0 left-0 right-0 z-[1] flex items-start justify-between gap-3 px-3 pt-3 sm:px-4 sm:pt-3.5">
                      <span className={`${item.color} text-[8px] sm:text-[9px] font-bold tracking-[0.35em] uppercase`}>
                        {item.tag}
                      </span>
                      <span className="shrink-0 text-[8px] sm:text-[9px] tracking-[0.28em] uppercase text-white/35 tabular-nums">
                        {item.year}
                      </span>
                    </div>

                    {/* Bottom copy */}
                    <div className="absolute bottom-0 left-0 right-0 z-[1] border-t border-white/[0.06] bg-black/55 px-3 py-3.5 backdrop-blur-md sm:px-4 sm:py-4">
                      <div className="absolute left-0 top-0 h-full w-0.5 origin-bottom scale-y-0 bg-white/70 transition-transform duration-300 ease-out group-hover:scale-y-100" aria-hidden />
                      <div className="flex items-end justify-between gap-3 pl-2.5 sm:pl-3">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-black uppercase leading-[1.15] tracking-tight text-white sm:text-base md:text-lg line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="mt-1.5 text-xs leading-snug text-white/45 line-clamp-2 transition-colors duration-300 group-hover:text-white/65 sm:text-sm">
                            {item.subtitle}
                          </p>
                        </div>
                        <span className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-300 group-hover:border-white/25 group-hover:text-white" aria-hidden>
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
