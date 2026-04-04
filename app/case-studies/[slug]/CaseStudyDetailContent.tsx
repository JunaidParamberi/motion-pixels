"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import type { CaseStudyDetail, CaseStudyMedia } from "../case-study-data";

const MotionMain = motion.main;
const MotionSection = motion.section;
const MotionDiv = motion.div;
const MotionH1 = motion.h1;
const MotionH2 = motion.h2;

const ease = [0.25, 0.46, 0.45, 0.94] as const;
const viewportOnce = { once: true, margin: "-60px", amount: 0.15 };

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
  project: CaseStudyDetail;
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

  const imagePosters = normalizedMedia
    .filter((item) => item.type === "image")
    .map((item) => item.src);
  const fallbackPoster = imagePosters[0] ?? project.heroImage;

  let videoPosterIndex = 0;
  const normalizedMediaWithPoster = normalizedMedia.map((item) => {
    if (item.type !== "video") {
      return { ...item, poster: undefined };
    }
    const poster =
      imagePosters.length > 0
        ? imagePosters[videoPosterIndex++ % imagePosters.length]
        : fallbackPoster;
    return { ...item, poster };
  });

  const mediaItems =
    normalizedMediaWithPoster.length > 0
      ? normalizedMediaWithPoster
      : [
          {
            id: "media-fallback",
            type: inferType(project.heroImage),
            src: project.heroImage,
            label: "Hero",
            description: "Project hero image",
            poster: project.heroImage,
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
              className="font-extrabold text-4xl md:text-6xl lg:text-7xl tracking-tighter uppercase leading-none mb-4"
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
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, ease }}
          >
            <div className="lg:sticky lg:top-32 space-y-10">
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
            { project.link && <div className="pt-6">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase border-b border-white pb-2 hover:text-white/60 hover:border-white/60 transition-all"
                >
                  Launch Experience
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden />
                </a>
              </div>}
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
          <div className="grid grid-cols-1 gap-6">
            {mediaItems.map((item, index) => (
              <MotionDiv
                key={item.id}
                className="relative w-full aspect-video overflow-hidden cursor-pointer group"
                variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, ease }}
                onClick={() => openViewerAt(index)}
                data-cursor="zoom"
              >
                <GalleryMediaCell item={item} />
              </MotionDiv>
            ))}
          </div>
        </motion.div>
      </MotionSection>

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
                className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/5 hover:bg-white/15 border border-white/20 items-center justify-center text-white/80"
                aria-label="Previous"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={goNext}
                className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/5 hover:bg-white/15 border border-white/20 items-center justify-center text-white/80"
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
                      className={`relative flex-shrink-0 overflow-hidden border transition-all ${
                        isActive
                          ? "border-white/80 ring-2 ring-white/40"
                          : "border-white/10 hover:border-white/40"
                      }`}
                    >
                      <div className="relative w-28 h-16 md:w-32 md:h-18 bg-white/5">
                        <ThumbnailMedia item={item} />
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

function ThumbnailMedia({ item }: { item: GalleryMediaItem }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  if (item.type === "image" || videoFailed) {
    return (
      <>
        {!isLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/10 via-white/5 to-white/10" />
        )}
        <Image
          src={item.type === "image" ? item.src : item.poster ?? item.src}
          alt={item.label}
          fill
          unoptimized
          loading="eager"
          sizes="128px"
          onLoadingComplete={() => setIsLoaded(true)}
          className={`object-cover transition-opacity duration-400 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      </>
    );
  }

  return (
    <>
      <Image
        src={item.poster ?? item.src}
        alt={item.label}
        fill
        unoptimized
        loading="eager"
        sizes="128px"
        className="object-cover"
      />
      <video
        src={item.src}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
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
  );
}

type GalleryMediaItem = {
  id: string;
  type: "image" | "video";
  src: string;
  label: string;
  description: string;
  poster?: string;
};

function GalleryMediaCell({
  item,
}: {
  item: GalleryMediaItem;
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <>
      {!isLoaded && item.type === "image" && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/10 via-white/5 to-white/10" />
      )}
      {item.type === "image" ? (
        <Image
          src={item.src}
          alt={item.label}
          fill
          unoptimized
          loading="eager"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          onLoadingComplete={() => setIsLoaded(true)}
          className={`object-cover w-full h-full transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : (
        videoFailed ? (
          <Image
            src={item.poster ?? item.src}
            alt={item.label}
            fill
            unoptimized
            loading="eager"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onLoadingComplete={() => setIsLoaded(true)}
            className={`object-cover w-full h-full transition-opacity duration-500 ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : (
          <>
            <Image
              src={item.poster ?? item.src}
              alt={item.label}
              fill
              unoptimized
              loading="eager"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover w-full h-full"
            />
            <video
              src={item.src}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                isLoaded ? "opacity-100" : "opacity-0"
              }`}
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
        )
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
    poster?: string;
  };
}

function CarouselMedia({ item }: CarouselMediaProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  return (
    <motion.div
      className="relative w-full max-w-5xl aspect-video overflow-hidden bg-black/60 border border-white/15"
      initial={{ opacity: 0, scale: 0.97, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: 20 }}
      transition={{ duration: 0.45, ease }}
    >
      {/* Skeleton while metadata / media loads */}
      {!isLoaded && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-white/5 via-white/10 to-white/5" />
      )}

      {item.type === "image" || videoFailed ? (
        <Image
          src={item.type === "image" ? item.src : item.poster ?? item.src}
          alt={item.label}
          fill
          unoptimized
          loading="eager"
          sizes="(max-width: 768px) 100vw, 1200px"
          className={`object-contain transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoadingComplete={() => setIsLoaded(true)}
        />
      ) : (
        <video
          src={item.src}
          className={`w-full h-full object-contain transition-opacity duration-500 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          controls
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
      )}

      {/* Keep overlays for images only; avoid dark layer on fullscreen video */}
      {item.type === "image" && (
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
      )}
    </motion.div>
  );
}
