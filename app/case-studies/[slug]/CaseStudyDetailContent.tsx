"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Play, ChevronLeft, ChevronRight, ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

const MotionMain = motion.main;
const MotionSection = motion.section;
const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionH2 = motion.h2;

const ease = [0.25, 0.46, 0.45, 0.94] as const;
const viewportOnce = { once: true, margin: "-60px", amount: 0.15 };

export type CaseStudy = {
  title: string;
  subtitle: string;
  category: string;
  year: string;
  heroImage: string;
  overview: string;
  challenge: string[];
  client: string;
  services: string[];
  location: string;
  tunnelImage: string;
  textureImage: string;
  lightingImage: string;
  landscapeImage: string;
};

const heroStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

interface CaseStudyDetailContentProps {
  project: CaseStudy;
}

export function CaseStudyDetailContent({ project }: CaseStudyDetailContentProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const caseStudiesHref =
    searchParams.toString().length > 0
      ? `/case-studies?${searchParams.toString()}`
      : "/case-studies";
  const inferType = (src: string): "image" | "video" => {
    const lower = src.toLowerCase();
    if (lower.endsWith(".mp4") || lower.endsWith(".webm") || lower.includes("video")) {
      return "video";
    }
    return "image";
  };

  const mediaItems = [
    {
      id: "tunnel",
      type: inferType(project.tunnelImage),
      src: project.tunnelImage,
      label: "Sequence",
      description: "Primary cinematic frame",
    },
    {
      id: "texture",
      type: inferType(project.textureImage),
      src: project.textureImage,
      label: "Concept",
      description: "Material and surface studies",
    },
    {
      id: "lighting",
      type: inferType(project.lightingImage),
      src: project.lightingImage,
      label: "FX Pass",
      description: "Lighting and FX detail",
    },
    {
      id: "landscape",
      type: inferType(project.landscapeImage),
      src: project.landscapeImage,
      label: "Final Frame",
      description: "Wide establishing shot",
    },
  ];

  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openViewerAt = (index: number) => {
    setActiveIndex(index);
    setIsViewerOpen(true);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const goPrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? mediaItems.length - 1 : prev - 1
    );
  };

  return (
    <MotionMain
      className="flex min-h-screen flex-col bg-[#0a0a0a] text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease }}
    >
      {/* Hero */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <MotionDiv
          className="absolute left-0 right-0 z-20 container mx-auto px-4 sm:px-6"
          style={{ top: "calc(var(--navbar-height, 4rem) + 2rem)" }}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease, delay: 0.2 }}
        >
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase">
            <Link
              href={caseStudiesHref}
              onClick={(event) => {
                event.preventDefault();
                router.back();
              }}
              className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 shrink-0" aria-hidden />
              Case Studies
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-white/40 shrink-0" aria-hidden />
            <span className="text-white">
              {project.title}
            </span>
          </nav>
        </MotionDiv>
        <MotionDiv
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease }}
        >
          <Image
            src={project.heroImage}
            alt="High-end architectural render with neon lighting accents"
            fill
            className="w-full h-full object-cover"
            priority
          />
        </MotionDiv>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-10">
          <motion.div
            className="container mx-auto px-4 sm:px-6"
            variants={heroStagger}
            initial="hidden"
            animate="visible"
          >
            <MotionH1
              variants={heroItem}
              transition={{ duration: 0.55, ease }}
              className="font-extrabold text-5xl md:text-8xl lg:text-9xl tracking-tighter uppercase leading-none mb-4"
            >
              {project.title}
            </MotionH1>
            <MotionDiv
              variants={heroItem}
              transition={{ duration: 0.5, ease }}
              className="flex items-center gap-4 text-sm tracking-[0.2em] text-white/60 uppercase"
            >
              <span>{project.category}</span>
              <span className="w-8 h-px bg-white/20" />
              <span>{project.year}</span>
            </MotionDiv>
          </motion.div>
        </div>
      </section>

      {/* Overview / Challenge */}
      <MotionSection
        className="container mx-auto px-4 sm:px-6 py-24"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, ease }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-16">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, ease }}
            >
              <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-white/40 mb-8 flex items-center gap-4">
                <span className="w-8 h-px bg-white/20" />
                Overview
              </h2>
              <p className="text-xl md:text-2xl font-medium leading-relaxed text-white/90">
                {project.overview}
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, ease }}
            >
              <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-white/40 mb-8 flex items-center gap-4">
                <span className="w-8 h-px bg-white/20" />
                The Challenge
              </h2>
              <div className="space-y-6 text-white/80 leading-loose text-lg">
                {project.challenge.map((para) => (
                  <p key={para.slice(0, 32)}>{para}</p>
                ))}
              </div>
            </motion.section>
          </div>

          <MotionDiv
            className="lg:col-span-4 border-l border-white/10 lg:pl-12 pt-8 lg:pt-0"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, ease }}
          >
            <div className="sticky top-32 space-y-10">
              <div>
                <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-2">
                  Client
                </h3>
                <p className="text-lg font-medium">{project.client}</p>
              </div>
              <div>
                <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-2">
                  Services
                </h3>
                <ul className="space-y-1 text-lg font-medium">
                  {project.services.map((service) => (
                    <li key={service}>{service}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-2">
                  Year
                </h3>
                <p className="text-lg font-medium">{project.year}</p>
              </div>
              <div>
                <h3 className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30 mb-2">
                  Location
                </h3>
                <p className="text-lg font-medium">{project.location}</p>
              </div>
              <div className="pt-6">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase border-b border-white pb-2 hover:text-white/60 hover:border-white/60 transition-all"
                >
                  Launch Experience
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden />
                </a>
              </div>
            </div>
          </MotionDiv>
        </div>
      </MotionSection>

      {/* Imagery gallery — type-aware: play overlay only for video, image only for image */}
      <MotionSection
        className="pb-24 space-y-6"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.6, ease }}
      >
        <motion.div
          className="container mx-auto px-4 sm:px-6 space-y-6"
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.1, delayChildren: 0.1 },
            },
          }}
        >
          <MotionDiv
            className="aspect-video w-full bg-black relative overflow-hidden rounded-lg group cursor-pointer"
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease }}
            onClick={() => openViewerAt(0)}
            data-cursor="zoom"
          >
            <GalleryMediaCell item={mediaItems[0]} layout="video" />
          </MotionDiv>
          <MotionDiv
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease }}
          >
            <div
              className="w-full aspect-square relative overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => openViewerAt(1)}
              data-cursor="zoom"
            >
              <GalleryMediaCell item={mediaItems[1]} layout="square" />
            </div>
            <div
              className="w-full aspect-square relative overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => openViewerAt(2)}
              data-cursor="zoom"
            >
              <GalleryMediaCell item={mediaItems[2]} layout="square" />
            </div>
          </MotionDiv>
          <MotionDiv
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            transition={{ duration: 0.5, ease }}
            className="w-full aspect-video relative cursor-pointer group rounded-lg overflow-hidden"
            onClick={() => openViewerAt(3)}
            data-cursor="zoom"
          >
            <GalleryMediaCell item={mediaItems[3]} layout="wide" />
          </MotionDiv>
        </motion.div>
      </MotionSection>

      {/* Next project teaser */}
      <MotionSection
        className="py-20 border-t border-white/5 bg-black/20"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewportOnce}
        transition={{ duration: 0.5, ease }}
      >
        <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center">
          <p className="text-white/40 text-xs font-bold tracking-[0.3em] uppercase mb-8">
            Next Project
          </p>
          <Link href={caseStudiesHref} className="group text-center block">
            <MotionH2
              className="text-4xl md:text-6xl font-bold tracking-tighter uppercase mb-6 group-hover:italic transition-all"
              transition={{ duration: 0.2 }}
            >
              CORE MATRIX
            </MotionH2>
            <ArrowRight
              className="w-10 h-10 inline-block group-hover:translate-x-4 transition-transform"
              aria-hidden
            />
          </Link>
        </div>
      </MotionSection>

      {/* Footer */}
      <motion.footer
        className="bg-black py-12 border-t border-white/5"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.4 }}
      >
        <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <Link
            href={caseStudiesHref}
            onClick={(event) => {
              event.preventDefault();
              router.back();
            }}
            className="flex items-center gap-2 group text-white/40 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden />
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase">
              Back to Case Studies
            </span>
          </Link>
          <div className="flex gap-8">
            <a
              href="#"
              className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href="#"
              className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors"
            >
              Behance
            </a>
            <a
              href="#"
              className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/20">
            © {project.year} Motion Pixels
          </p>
        </div>
      </motion.footer>

      {/* Fullscreen media viewer */}
      <AnimatePresence>
        {isViewerOpen && (
          <motion.div
            className="fixed inset-0 z-[80] bg-black/95 backdrop-blur-sm flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Top bar */}
            <div className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-white/10">
              <div className="flex items-center gap-8 text-xs md:text-sm tracking-[0.25em] uppercase text-white/60">
                {/* <span className="font-semibold text-white">Motion Pixels</span> */}
                <div className="hidden sm:flex items-center gap-2">
                  <span className="text-white/40">Project</span>
                  <span className="w-6 h-px bg-white/20" />
                  <span className="text-white font-medium">{project.title}</span>
                </div>
              </div>
              <button
                onClick={() => setIsViewerOpen(false)}
                className="text-white/70 hover:text-white text-sm font-semibold tracking-[0.2em] uppercase"
              >
                Cancel
              </button>
            </div>

            {/* Main media area */}
              <div className="flex-1 flex flex-col overflow-hidden">
              <div className="relative flex-1 flex items-center justify-center px-4 md:px-10 py-6">
                <CarouselMedia key={mediaItems[activeIndex].id} item={mediaItems[activeIndex]} />

                {/* Left / right arrows */}
              <button
                onClick={goPrev}
                className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/20 items-center justify-center text-white/80"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goNext}
                className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/5 hover:bg-white/15 border border-white/20 items-center justify-center text-white/80"
                aria-label="Next"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
              </div>
            </div>

            {/* Thumbnails strip */}
            <div className="border-t border-white/10 px-4 md:px-10 py-4 bg-black/80">
              <div className="flex items-center justify-center mb-3">
                <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-white/50 text-center">
                  Project Assets ({mediaItems.length})
                </p>
              </div>
              <div className="flex items-center justify-center gap-3 overflow-x-auto pb-2">
                {mediaItems.map((item, index) => {
                  const isActive = index === activeIndex;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveIndex(index)}
                      className={`relative flex-shrink-0 overflow-hidden rounded-md border transition-all ${
                        isActive
                          ? "border-white/80 ring-2 ring-white/40"
                          : "border-white/10 hover:border-white/40"
                      }`}
                    >
                      <div className="relative w-28 h-16 md:w-32 md:h-18 bg-white/5">
                        {item.type === "image" ? (
                          <Image
                            src={item.src}
                            alt={item.label}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <video
                            src={item.src}
                            className="w-full h-full object-cover"
                            muted
                            loop
                            playsInline
                          />
                        )}
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                      <span className="absolute left-2 bottom-2 text-[10px] uppercase tracking-[0.2em] text-white/80">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionMain>
  );
}

type GalleryMediaItem = {
  id: string;
  type: "image" | "video";
  src: string;
  label: string;
  description: string;
};

function GalleryMediaCell({
  item,
  layout,
}: {
  item: GalleryMediaItem;
  layout: "video" | "square" | "wide";
}) {
  const isVideo = item.type === "video";

  return (
    <>
      {item.type === "image" ? (
        <Image
          src={item.src}
          alt={item.label}
          fill
          className="object-cover w-full h-full"
        />
      ) : (
        <video
          src={item.src}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="metadata"
        />
      )}
      {isVideo && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm pointer-events-none">
          <Play className="w-14 h-14 text-white drop-shadow-lg" aria-hidden />
        </div>
      )}
    </>
  );
}

interface CarouselMediaProps {
  item: {
    id: string;
    type: "image" | "video";
    src: string;
    label: string;
    description: string;
  };
}

function CarouselMedia({ item }: CarouselMediaProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <motion.div
      className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden bg-black/60 border border-white/15"
      initial={{ opacity: 0, scale: 0.97, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: 20 }}
      transition={{ duration: 0.45, ease }}
    >
      {/* Skeleton while metadata / media loads */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/5 via-white/10 to-white/5" />
      )}

      {item.type === "image" ? (
        <Image
          src={item.src}
          alt={item.label}
          fill
          className={`object-cover transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoadingComplete={() => setIsLoaded(true)}
        />
      ) : (
        <video
          src={item.src}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          controls
          autoPlay
          playsInline
          onLoadedData={() => setIsLoaded(true)}
        />
      )}

      {/* Center play button overlay only for video */}
      {item.type === "video" && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#ff5a1f] flex items-center justify-center shadow-[0_0_40px_rgba(255,90,31,0.55)]">
            <Play className="w-7 h-7 text-white translate-x-0.5" aria-hidden />
          </div>
        </div>
      )}

      {/* Bottom gradient and text */}
      <div className="absolute inset-x-0 bottom-0 p-4 md:p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        <div>
          <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-white/60">
            {item.label}
          </p>
          <p className="text-sm md:text-base text-white/90 mt-1">
            {item.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
