"use client"

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { caseStudyDetails } from "./case-study-data";
import type { CaseStudyDetail } from "./case-study-data";

type CaseStudyCard = Pick<
  CaseStudyDetail,
  "slug" | "title" | "subtitle" | "tag" | "color" | "cardImage" | "year"
>;

const caseStudyCards: CaseStudyCard[] = Object.values(caseStudyDetails).map((detail) => ({
  slug: detail.slug,
  title: detail.title,
  subtitle: detail.subtitle,
  tag: detail.tag,
  color: detail.color,
  cardImage: detail.cardImage,
  year: detail.year,
}));

const CaseStudiesPage = () => {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <motion.div
      className="bg-background-light dark:bg-background-dark text-gray-900 dark:text-white font-sans antialiased min-h-screen flex flex-col transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <main className="flex-grow relative">
        <motion.div
          className="fixed inset-0 -z-10 bg-background-dark overflow-hidden [will-change:transform]"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background-dark/80 via-background-dark/95 to-background-dark" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
        </motion.div>

        <section className="pt-40 pb-16 container mx-auto px-4 sm:px-6">
          <motion.h1
            className="text-white text-4xl md:text-6xl font-extrabold text-left w-full leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Case Studies
          </motion.h1>
        </section>

        <section className="container mx-auto px-4 sm:px-6 pb-24">
          <motion.div
            className="flex flex-wrap gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.06, delayChildren: 0.1 },
              },
            }}
          >
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
                      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
                    },
                  }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="w-full sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)] shrink-0"
                >
                  <Link href={`/case-studies/${item.slug}`} className="block" data-cursor="zoom">
                    <motion.div
                      className="group relative overflow-hidden cursor-pointer rounded-lg"
                      whileHover={{ y: -4 }}
                    >
                      <CaseStudyCardMedia src={item.cardImage} alt={item.title} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-6">
                        <span className={`${item.color} text-xs font-bold tracking-widest uppercase mb-1`}>
                          {item.tag}
                        </span>
                        <h3 className="text-white font-display text-2xl font-bold uppercase tracking-wide">
                          {item.title}
                        </h3>
                        <p className="text-sm text-white/85 mt-1 line-clamp-2">
                          {item.subtitle}
                        </p>
                        <p className="text-[11px] uppercase tracking-[0.18em] text-white/60 mt-3">
                          {item.year}
                        </p>
                      </div>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      </main>
    </motion.div>
  );
};

function CaseStudyCardMedia({ src, alt }: { src: string; alt: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full aspect-square">
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/10 via-white/5 to-white/10" />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        unoptimized
        loading="eager"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        onLoadingComplete={() => setIsLoaded(true)}
        className={`object-cover transform group-hover:scale-105 transition-[transform,opacity] duration-700 ease-out ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

export default CaseStudiesPage;
