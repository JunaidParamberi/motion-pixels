"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowLeft, ExternalLink } from "lucide-react";
import type { CaseStudyDetail, CaseStudyMedia } from "../case-study-data";
import PageContainer from "../../components/PageContainer";

const MotionSection = motion.section;
const MotionDiv = motion.div;

const ease = [0.25, 0.46, 0.45, 0.94] as const;
const viewport = { once: true, margin: "-60px", amount: 0.15 as const };

function heroTitleLines(title: string): { line1: string; line2: string } {
  const words = title.trim().split(/\s+/).filter(Boolean);
  if (words.length <= 1) return { line1: title, line2: "" };
  const line2 = words.pop() ?? "";
  return { line1: words.join(" "), line2 };
}

interface CaseStudyDetailContentProps {
  project: CaseStudyDetail;
}

export function CaseStudyDetailContent({ project }: CaseStudyDetailContentProps) {
  const searchParams = useSearchParams();
  const caseStudiesHref =
    searchParams.toString().length > 0
      ? `/case-studies?${searchParams.toString()}`
      : "/case-studies";

  const inferType = (src: string): "image" | "video" => {
    const lower = src.toLowerCase();
    if (lower.endsWith(".mp4") || lower.endsWith(".webm") || lower.includes("video")) return "video";
    return "image";
  };

  const normalizedMedia = (project.media ?? [])
    .filter((item): item is CaseStudyMedia => Boolean(item?.src))
    .map((item, index) => ({
      id: `media-${index}`,
      type: item.type ?? inferType(item.src),
      src: item.src,
      label: item.label ?? `Media ${index + 1}`,
      description: item.description ?? "Project media asset",
      poster: undefined as string | undefined,
    }));

  const imagePosters = normalizedMedia.filter((i) => i.type === "image").map((i) => i.src);
  const fallbackPoster = imagePosters[0] ?? project.heroImage;

  let videoPosterIndex = 0;
  const normalizedMediaWithPoster = normalizedMedia.map((item) => {
    if (item.type !== "video") return { ...item, poster: undefined };
    const poster = imagePosters.length > 0
      ? imagePosters[videoPosterIndex++ % imagePosters.length]
      : fallbackPoster;
    return { ...item, poster };
  });

  const mediaItems = normalizedMediaWithPoster.length > 0
    ? normalizedMediaWithPoster
    : [{
        id: "media-fallback",
        type: inferType(project.heroImage),
        src: project.heroImage,
        label: "Hero",
        description: "Project hero image",
        poster: project.heroImage,
      }];

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openViewerAt = (index: number) => { setActiveIndex(index); setIsViewerOpen(true); };
  const goNext = () => setActiveIndex((p) => (p + 1) % mediaItems.length);
  const goPrev = () => setActiveIndex((p) => (p === 0 ? mediaItems.length - 1 : p - 1));

  const { line1, line2 } = heroTitleLines(project.title);

  return (
    <>
      <PageContainer className="flex flex-col">
        {/* ── Breadcrumb ─────────────────────────────────── */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease, delay: 0.05 }}
        >
          <nav className="flex flex-wrap items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase">
            <Link
              href={caseStudiesHref}
              className="inline-flex items-center gap-2 text-white/45 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden />
              Case Studies
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/20 shrink-0" aria-hidden />
            <span className="text-white/70">{project.title}</span>
          </nav>
        </motion.div>

        {/* ── Hero (matches services / case-studies index) ── */}
        <motion.section
          className="pb-16 border-b border-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease, delay: 0.06 }}
        >
          <span className="block text-[10px] tracking-[0.45em] text-white/30 uppercase mb-8">
            Case Study — Motion Pixels
          </span>
          <h1
            className="font-black text-white leading-none tracking-tight"
            style={{ fontSize: "clamp(3.5rem, 9vw, 7.5rem)" }}
          >
            {line1}
            {line2 ? (
              <>
                <br />
                {line2}
                <span className="text-white/15">.</span>
              </>
            ) : (
              <span className="text-white/15">.</span>
            )}
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-4 text-[10px] tracking-[0.3em] text-white/45 uppercase">
            <span>{project.category}</span>
            <span className="w-8 h-px bg-white/20 shrink-0" aria-hidden />
            <span>{project.year}</span>
          </div>
        </motion.section>

        {/* ── Featured image ───────────────────────────────── */}
        <motion.section
          className="py-10 lg:py-14"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease, delay: 0.1 }}
        >
          <div className="relative w-full aspect-[16/9] min-h-[200px] max-h-[min(70vh,560px)] border border-white/[0.07] overflow-hidden bg-white/[0.03]">
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, min(1280px, 100vw)"
            />
          </div>
        </motion.section>

        {/* ── Overview / Challenge ─────────────────────────── */}
        <MotionSection
          className="py-14 lg:py-16 border-t border-white/10"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6, ease }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: overview + challenge */}
            <div className="lg:col-span-8 space-y-14">
              <section>
                <div className="flex items-center gap-4 mb-10">
                  <span className="text-[9px] tracking-[0.5em] text-white/25 uppercase">01</span>
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-[10px] tracking-[0.35em] text-white/35 uppercase">Overview</span>
                </div>
                <p className="text-xl md:text-2xl font-medium leading-relaxed text-white/85">
                  {project.overview}
                </p>
              </section>

              <section>
                <div className="flex items-center gap-4 mb-10">
                  <span className="text-[9px] tracking-[0.5em] text-white/25 uppercase">02</span>
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-[10px] tracking-[0.35em] text-white/35 uppercase">The Challenge</span>
                </div>
                <div className="space-y-5 text-white/65 leading-relaxed text-base md:text-lg">
                  {project.challenge.map((para) => (
                    <p key={para.slice(0, 32)}>{para}</p>
                  ))}
                </div>
              </section>
            </div>

          {/* Right: sidebar info */}
          <MotionDiv
            className="lg:col-span-4 border-l border-white/10 lg:pl-10 pt-2 lg:pt-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewport}
            transition={{ duration: 0.5, ease, delay: 0.1 }}
          >
            <div className="lg:sticky lg:top-32 space-y-8">
              {[
                { label: "Client", value: project.client },
                { label: "Year", value: project.year },
                { label: "Location", value: project.location },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[9px] tracking-[0.4em] uppercase text-white/25 mb-1.5">{label}</p>
                  <p className="text-base font-medium text-white/80">{value}</p>
                </div>
              ))}
              <div>
                <p className="text-[9px] tracking-[0.4em] uppercase text-white/25 mb-2">Services</p>
                <ul className="space-y-1">
                  {project.services.map((service) => (
                    <li key={service} className="text-base font-medium text-white/80">{service}</li>
                  ))}
                </ul>
              </div>
              {project.link && (
                <div className="pt-2 border-t border-white/10">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.25em] uppercase text-white border-b border-white pb-1.5 hover:text-white/60 hover:border-white/40 transition-all"
                  >
                    Launch Experience
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          </MotionDiv>
        </div>
      </MotionSection>

      {/* ── Gallery ──────────────────────────────────────── */}
      <MotionSection
        className="py-14 lg:py-16 border-t border-white/10"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.6, ease }}
      >
        <div className="mb-10 flex items-center gap-4">
          <span className="text-[9px] tracking-[0.5em] text-white/25 uppercase">03</span>
          <span className="text-[10px] tracking-[0.35em] text-white/35 uppercase">Project Assets</span>
          <div className="flex-1 h-px bg-white/10 min-w-[1rem]" />
          <span className="text-[9px] tracking-[0.3em] text-white/20 uppercase tabular-nums shrink-0">
            {mediaItems.length} items
          </span>
        </div>

        <motion.div
          className="w-full"
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } } }}
        >
          {/* Behance-style: one full-width block per row + caption */}
          <div className="flex flex-col gap-14 lg:gap-20">
            {mediaItems.map((item, index) => (
              <MotionDiv
                key={item.id}
                className="group cursor-pointer rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.55, ease }}
                onClick={() => openViewerAt(index)}
                data-cursor="zoom"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openViewerAt(index);
                  }
                }}
              >
                <div className="relative w-full overflow-hidden border border-white/[0.08] bg-zinc-950 transition-colors duration-300 group-hover:border-white/15 aspect-video sm:aspect-[16/9]">
                  <GalleryMediaCell item={item} presentation="column" />
                  <div className="pointer-events-none absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" aria-hidden />
                </div>
                <figcaption className="mt-5 flex max-w-3xl flex-col gap-2 border-l border-white/10 pl-5 sm:mt-6 sm:pl-6">
                  <span className="text-[10px] font-bold tracking-[0.35em] text-white/35 uppercase">
                    {item.label}
                  </span>
                  <p className="text-sm leading-relaxed text-white/55 md:text-base">{item.description}</p>
                </figcaption>
              </MotionDiv>
            ))}
          </div>
        </motion.div>
      </MotionSection>

      {/* ── Back CTA ─────────────────────────────────────── */}
      <MotionDiv
        className="pt-10 pb-8 border-t border-white/10"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewport}
        transition={{ duration: 0.5, ease }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <Link
            href={caseStudiesHref}
            className="inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-white/40 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden />
            All Case Studies
          </Link>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-white text-black font-bold text-[10px] tracking-[0.2em] uppercase hover:bg-white/90 transition-colors text-center sm:text-left"
          >
            Start a Project
          </Link>
        </div>
      </MotionDiv>
      </PageContainer>

      {/* ── Fullscreen viewer ────────────────────────────── */}
      <AnimatePresence>
        {isViewerOpen && (
          <motion.div
            className="fixed inset-0 z-[80] bg-black/97 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-white/10">
              <div className="flex items-center gap-3 text-[10px] tracking-[0.25em] uppercase text-white/40">
                <span className="hidden sm:block">{project.title}</span>
                <span className="hidden sm:block w-4 h-px bg-white/20" />
                <span className="text-white/60">{mediaItems[activeIndex].label}</span>
              </div>
              <button
                onClick={() => setIsViewerOpen(false)}
                className="text-white/45 hover:text-white text-[10px] font-bold tracking-[0.25em] uppercase transition-colors"
              >
                Close
              </button>
            </div>

            {/* Main media */}
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="relative flex-1 flex items-center justify-center px-4 md:px-10 py-6">
                <CarouselMedia key={mediaItems[activeIndex].id} item={mediaItems[activeIndex]} />
                <button
                  onClick={goPrev}
                  className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 border border-white/15 hover:border-white/30 items-center justify-center text-white/50 hover:text-white transition-all"
                  aria-label="Previous"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={goNext}
                  className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 border border-white/15 hover:border-white/30 items-center justify-center text-white/50 hover:text-white transition-all"
                  aria-label="Next"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Thumbnail strip */}
            <div className="border-t border-white/10 px-4 md:px-10 py-4 bg-black">
              <div className="flex items-center justify-center gap-2.5 overflow-x-auto pb-1">
                {mediaItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveIndex(index)}
                    className={`relative flex-shrink-0 overflow-hidden border transition-all ${
                      index === activeIndex
                        ? "border-white/70"
                        : "border-white/10 hover:border-white/30"
                    }`}
                  >
                    <div className="relative w-24 h-14 bg-white/5">
                      <ThumbnailMedia item={item} />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Media subcomponents ───────────────────────────────────

type GalleryMediaItem = {
  id: string;
  type: "image" | "video";
  src: string;
  label: string;
  description: string;
  poster?: string;
};

function ThumbnailMedia({ item }: { item: GalleryMediaItem }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  if (item.type === "image" || videoFailed) {
    return (
      <>
        {!isLoaded && <div className="absolute inset-0 animate-pulse bg-white/5" />}
        <Image
          src={item.type === "image" ? item.src : (item.poster ?? item.src)}
          alt={item.label}
          fill
          unoptimized
          loading="eager"
          sizes="96px"
          onLoadingComplete={() => setIsLoaded(true)}
          className={`object-cover transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        />
      </>
    );
  }

  return (
    <>
      <Image src={item.poster ?? item.src} alt={item.label} fill unoptimized loading="eager" sizes="96px" className="object-cover" />
      <video
        src={item.src}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        autoPlay muted loop playsInline preload="metadata"
        poster={item.poster}
        onLoadedMetadata={() => setIsLoaded(true)}
        onError={() => { setVideoFailed(true); setIsLoaded(true); }}
      />
    </>
  );
}

function GalleryMediaCell({
  item,
  presentation = "grid",
}: {
  item: GalleryMediaItem;
  /** `column`: letterbox stills; videos always cover the frame; `grid`: dense cover crop */
  presentation?: "grid" | "column";
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const fit = presentation === "column" ? "object-contain" : "object-cover";
  /** Poster + video must both cover; otherwise `object-contain` letterboxing reveals a mismatched poster still. */
  const videoFit = "object-cover";
  const sizes =
    presentation === "column"
      ? "(max-width: 768px) 100vw, min(1200px, 100vw)"
      : "(max-width: 768px) 100vw, 50vw";

  return (
    <>
      {!isLoaded && item.type === "image" && <div className="absolute inset-0 animate-pulse bg-white/5" />}
      {item.type === "image" ? (
        <Image
          src={item.src}
          alt={item.label}
          fill
          unoptimized
          loading="eager"
          sizes={sizes}
          onLoadingComplete={() => setIsLoaded(true)}
          className={`${fit} w-full h-full transition-opacity duration-500 group-hover:scale-[1.01] transition-transform duration-700 ease-out ${isLoaded ? "opacity-100" : "opacity-0"}`}
        />
      ) : videoFailed ? (
        <Image
          src={item.poster ?? item.src}
          alt={item.label}
          fill
          unoptimized
          loading="eager"
          sizes={sizes}
          onLoadingComplete={() => setIsLoaded(true)}
          className={`${videoFit} w-full h-full transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        />
      ) : (
        <>
          <Image
            src={item.poster ?? item.src}
            alt={item.label}
            fill
            unoptimized
            loading="eager"
            sizes={sizes}
            className={`${videoFit} w-full h-full`}
          />
          <video
            src={item.src}
            className={`absolute inset-0 w-full h-full ${videoFit} transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={item.poster}
            onLoadedMetadata={() => setIsLoaded(true)}
            onError={() => {
              setVideoFailed(true);
              setIsLoaded(true);
            }}
          />
        </>
      )}
    </>
  );
}

function CarouselMedia({ item }: { item: GalleryMediaItem }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <motion.div
      className="relative w-full max-w-5xl aspect-video overflow-hidden bg-white/5 border border-white/10"
      initial={{ opacity: 0, scale: 0.97, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: 16 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {!isLoaded && <div className="absolute inset-0 animate-pulse bg-white/5" />}

      {item.type === "image" || videoFailed ? (
        <Image
          src={item.type === "image" ? item.src : (item.poster ?? item.src)}
          alt={item.label}
          fill
          unoptimized
          loading="eager"
          sizes="(max-width: 768px) 100vw, 1200px"
          className={`object-contain transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          onLoadingComplete={() => setIsLoaded(true)}
        />
      ) : (
        <video
          src={item.src}
          className={`w-full h-full object-contain transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
          controls autoPlay muted loop playsInline preload="metadata"
          poster={item.poster}
          onLoadedMetadata={() => setIsLoaded(true)}
          onError={() => { setVideoFailed(true); setIsLoaded(true); }}
        />
      )}

      {item.type === "image" && (
        <div className="absolute inset-x-0 bottom-0 px-5 py-4 bg-gradient-to-t from-black/80 to-transparent">
          <p className="text-[9px] tracking-[0.3em] uppercase text-white/45">{item.label}</p>
          <p className="text-sm text-white/70 mt-0.5">{item.description}</p>
        </div>
      )}
    </motion.div>
  );
}
