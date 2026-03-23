"use client"

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { servicesListing } from "@/app/data/site-data";
import { caseStudyDetails } from "./case-study-data";
import type { CaseStudyDetail } from "./case-study-data";
import { ChevronDown } from "lucide-react";

const ALL_TAG = "all";

type SortKey = "title-asc" | "title-desc" | "year-desc" | "year-asc" | "added-desc";
type CaseStudyCard = Pick<
  CaseStudyDetail,
  "slug" | "title" | "subtitle" | "tag" | "serviceFilter" | "client" | "color" | "cardImage" | "year"
>;

const caseStudyCards: CaseStudyCard[] = Object.values(caseStudyDetails).map((detail) => ({
  slug: detail.slug,
  title: detail.title,
  subtitle: detail.subtitle,
  tag: detail.tag,
  serviceFilter: detail.serviceFilter,
  client: detail.client,
  color: detail.color,
  cardImage: detail.cardImage,
  year: detail.year,
}));

const serviceFilterOptions = [ALL_TAG, ...servicesListing.map((service) => service.title)];

function parseYear(year: string): number {
  const y = parseInt(year, 10);
  return Number.isNaN(y) ? 0 : y;
}

const addedIndexMap: Record<string, number> = caseStudyCards.reduce(
  (acc, item, index) => {
    acc[item.slug] = index;
    return acc;
  },
  {} as Record<string, number>
);

function filterAndSort(
  items: CaseStudyCard[],
  filterTag: string,
  searchQuery: string,
  sortKey: SortKey
): CaseStudyCard[] {
  const byService =
    filterTag === ALL_TAG
      ? [...items]
      : items.filter((s) => s.serviceFilter.trim().toLowerCase() === filterTag.toLowerCase());
  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filtered =
    normalizedQuery.length === 0
      ? byService
      : byService.filter((item) =>
          [item.title, item.subtitle, item.tag, item.client].some((field) =>
            field.toLowerCase().includes(normalizedQuery)
          )
        );

  const sorted = [...filtered].sort((a, b) => {
    switch (sortKey) {
      case "title-asc": {
        return a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
      }
      case "title-desc": {
        return b.title.localeCompare(a.title, undefined, { sensitivity: "base" });
      }
      case "year-desc": {
        const ay = parseYear(a.year);
        const by = parseYear(b.year);
        if (ay === by) {
          return a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
        }
        return by - ay;
      }
      case "year-asc": {
        const ay = parseYear(a.year);
        const by = parseYear(b.year);
        if (ay === by) {
          return a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
        }
        return ay - by;
      }
      case "added-desc":
      default: {
        const ai = addedIndexMap[a.slug] ?? 0;
        const bi = addedIndexMap[b.slug] ?? 0;
        if (ai === bi) {
          return b.title.localeCompare(a.title, undefined, { sensitivity: "base" });
        }
        // Newest added last in data should appear first
        return bi - ai;
      }
    }
  });
  return sorted;
}

const CaseStudiesPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.toString();

  // URL is the single source of truth for filter + sort
  const rawType = searchParams.get("type");
  const rawQuery = searchParams.get("q") ?? "";
  const rawSort = searchParams.get("sort") as SortKey | null;

  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const filterTag =
    rawType && (rawType === ALL_TAG || serviceFilterOptions.includes(rawType)) ? rawType : ALL_TAG;

  const validSortKeys: SortKey[] = ["title-asc", "title-desc", "year-desc", "year-asc", "added-desc"];
  const sortKey: SortKey = rawSort && validSortKeys.includes(rawSort) ? rawSort : "added-desc";
  const searchQuery = rawQuery.trim();

  const displayItems = useMemo(
    () => filterAndSort(caseStudyCards, filterTag, searchQuery, sortKey),
    [filterTag, searchQuery, sortKey]
  );

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  const updateUrl = (nextFilter: string, nextSort: SortKey, nextQuery: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (nextFilter === ALL_TAG) {
      params.delete("type");
    } else {
      params.set("type", nextFilter);
    }
    if (nextSort === "added-desc") {
      params.delete("sort");
    } else {
      params.set("sort", nextSort);
    }
    if (nextQuery.trim().length === 0) {
      params.delete("q");
    } else {
      params.set("q", nextQuery.trim());
    }
    const query = params.toString();
    const href = query ? `${pathname}?${query}` : pathname;
    router.replace(href, { scroll: false });
  };

  const filterLabel = filterTag === ALL_TAG ? "All" : filterTag;
  const sortLabel =
    sortKey === "title-asc"
      ? "Title A–Z"
      : sortKey === "title-desc"
      ? "Title Z–A"
      : sortKey === "year-desc"
      ? "Year (Newest)"
      : sortKey === "year-asc"
      ? "Year (Oldest)"
      : "Latest Added";

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
          {/* <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=2080&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" /> */}
          <div className="absolute inset-0 bg-gradient-to-b from-background-dark/80 via-background-dark/95 to-background-dark" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
        </motion.div>

        <section className="pt-40 pb-16 container mx-auto px-4 sm:px-6">
          {/* <motion.h1
            className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-white uppercase tracking-tighter mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Case Studies
          </motion.h1> */}
          <motion.h1
        className="text-white text-4xl md:text-6xl font-extrabold text-left w-full leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
       Case Studies
      </motion.h1>
          {/* <motion.p
            className="text-gray-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Exploring the intersection of technology and art. We craft
            immersive digital experiences, visual effects, and interactive
            installations that redefine reality.
          </motion.p> */}

          {/* Filters by project type */}
          <motion.div
            className="mt-12 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="flex flex-wrap gap-2">
              {serviceFilterOptions.map((tag) => {
                const value = tag === ALL_TAG ? ALL_TAG : tag;
                const isActive = filterTag === value;
                return (
                  <motion.button
                    key={tag}
                    type="button"
                    onClick={() => {
                      updateUrl(value, sortKey, searchQuery);
                    }}
                    className={`px-4 py-1.5 text-sm tracking-widest border-b-2 uppercase font-medium transition-colors ${
                      isActive
                        ? "border-white text-white"
                        : "border-transparent text-gray-500 hover:text-white hover:border-gray-600"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {tag === ALL_TAG ? "All" : tag}
                  </motion.button>
                );
              })}
            </div>

            <input
              type="search"
              value={searchQuery}
              onChange={(event) => updateUrl(filterTag, sortKey, event.target.value)}
              placeholder="Search case studies"
              className="w-full sm:w-72 bg-transparent border border-white/20 rounded-md px-4 py-1.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-white/50"
              aria-label="Search case studies"
            />

            {/* Sort dropdown */}
            <div className="relative ml-auto">
              <button
                type="button"
                onClick={() => setSortDropdownOpen((o) => !o)}
                className="inline-flex items-center gap-2 px-4 py-1.5 text-sm tracking-widest uppercase font-medium text-gray-400 hover:text-white transition-colors border border-white/20 rounded-md"
                aria-expanded={sortDropdownOpen}
                aria-haspopup="listbox"
                aria-label="Sort by"
              >
                {sortLabel}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${sortDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {sortDropdownOpen && (
                  <>
                    <button
                      type="button"
                      className="fixed inset-0 z-10"
                      aria-label="Close menu"
                      onClick={() => setSortDropdownOpen(false)}
                    />
                    <motion.ul
                      role="listbox"
                      className="absolute right-0 top-full mt-2 z-20 min-w-[180px] py-2 rounded-lg bg-black/90 border border-white/10 backdrop-blur-md shadow-xl"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                    >
                      <li>
                        <button
                          type="button"
                          role="option"
                          aria-selected={sortKey === "title-asc"}
                          onClick={() => {
                            setSortDropdownOpen(false);
                            updateUrl(filterTag, "title-asc", searchQuery);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm uppercase tracking-wider ${
                            sortKey === "title-asc" ? "text-white bg-white/10" : "text-gray-400 hover:text-white"
                          }`}
                        >
                          Title A–Z
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          role="option"
                          aria-selected={sortKey === "title-desc"}
                          onClick={() => {
                            setSortDropdownOpen(false);
                            updateUrl(filterTag, "title-desc", searchQuery);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm uppercase tracking-wider ${
                            sortKey === "title-desc" ? "text-white bg-white/10" : "text-gray-400 hover:text-white"
                          }`}
                        >
                          Title Z–A
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          role="option"
                          aria-selected={sortKey === "year-desc"}
                          onClick={() => {
                            setSortDropdownOpen(false);
                            updateUrl(filterTag, "year-desc", searchQuery);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm uppercase tracking-wider ${
                            sortKey === "year-desc" ? "text-white bg-white/10" : "text-gray-400 hover:text-white"
                          }`}
                        >
                          Year (Newest)
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          role="option"
                          aria-selected={sortKey === "year-asc"}
                          onClick={() => {
                            setSortDropdownOpen(false);
                            updateUrl(filterTag, "year-asc", searchQuery);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm uppercase tracking-wider ${
                            sortKey === "year-asc" ? "text-white bg-white/10" : "text-gray-400 hover:text-white"
                          }`}
                        >
                          Year (Oldest)
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          role="option"
                          aria-selected={sortKey === "added-desc"}
                          onClick={() => {
                            setSortDropdownOpen(false);
                            updateUrl(filterTag, "added-desc", searchQuery);
                          }}
                          className={`w-full text-left px-4 py-2 text-sm uppercase tracking-wider ${
                            sortKey === "added-desc" ? "text-white bg-white/10" : "text-gray-400 hover:text-white"
                          }`}
                        >
                          Latest Added
                        </button>
                      </li>
                    </motion.ul>
                  </>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

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
              {displayItems.map((item) => (
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
                  <Link
                    href={
                      currentQuery.length > 0
                        ? `/case-studies/${item.slug}?${currentQuery}`
                        : `/case-studies/${item.slug}`
                    }
                    className="block"
                    data-cursor="zoom"
                  >
                    <motion.div
                      className="group relative overflow-hidden cursor-pointer rounded-lg"
                      whileHover={{ y: -4 }}
                    >
                      <img
                        src={item.cardImage}
                        alt={item.title}
                        className="w-full h-auto object-cover aspect-square transform group-hover:scale-105 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-6">
                        <span
                          className={`${item.color} text-xs font-bold tracking-widest uppercase mb-1`}
                        >
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

export default CaseStudiesPage;