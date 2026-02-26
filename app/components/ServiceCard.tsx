"use client";

import React, { useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import serviceImage from "../Assets/Images/services/bg3.jpg";

interface ServiceCardProps {
  image: StaticImageData;
  title: string;
  alt?: string;
  link?: string;
  subText?: string;
  videoSrc?: string;
  index?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  image,
  title,
  alt,
  link,
  videoSrc,
  subText,
  index = 0,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(mouseY, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(mouseX, { stiffness: 300, damping: 30 });

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(y * -6);
    mouseY.set(x * 6);
  };

  const indexLabel = String(index + 1).padStart(2, "0");
  const categoryLabel = alt || "Service";

  const CardContent = (
    <motion.div
      ref={cardRef}
      className="group w-full relative overflow-hidden cursor-pointer rounded-2xl"
      style={{
        height: "clamp(180px, 22vw, 260px)",
        minHeight: 180,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      } as React.CSSProperties}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px", amount: 0.15 }}
      transition={{
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
      }}
      whileTap={{ scale: 0.99 }}
    >
      <motion.div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        initial={false}
        animate={{
          scale: isHovered ? 1.03 : 1,
          boxShadow: isHovered
            ? "0 32px 64px -12px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)"
            : "0 4px 24px -4px rgba(0,0,0,0.3)",
        }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        {/* Media */}
        <div className="absolute inset-0 z-0">
          <motion.div
            className="absolute inset-0"
            initial={false}
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Image
              src={image || serviceImage}
              alt={alt || "Service"}
              fill
              className="object-cover"
              placeholder="blur"
            />
          </motion.div>
          <AnimatePresence mode="wait">
            {videoSrc && isHovered ? (
              <motion.div
                key="video"
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45 }}
              >
                <video
                  ref={videoRef}
                  src={videoSrc}
                  className="object-cover w-full h-full"
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  muted
                  loop
                  playsInline
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Overlay gradient - dark at bottom for text, stacked first so it stays behind shine */}
        <motion.div
          className="absolute inset-0 z-10 pointer-events-none rounded-2xl"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.4) 35%, transparent 65%), linear-gradient(135deg, rgba(0,0,0,0.5) 0%, transparent 55%)",
          }}
          initial={false}
          animate={{ opacity: isHovered ? 0.92 : 1 }}
          transition={{ duration: 0.35 }}
        />

        {/* Hover shine - subtle diagonal highlight, above overlay */}
        <motion.div
          className="absolute inset-0 z-[11] pointer-events-none rounded-2xl"
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            background:
              "linear-gradient(115deg, transparent 0%, transparent 45%, rgba(255,255,255,0.07) 55%, transparent 70%, transparent 100%)",
          }}
        />

        {/* Left accent - violet tint on hover */}
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1 z-20 rounded-l-2xl origin-bottom"
          initial={false}
          animate={{
            scaleY: isHovered ? 1 : 0.35,
            backgroundColor: isHovered ? "rgba(139, 92, 246, 0.7)" : "rgba(255,255,255,0.5)",
          }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        />

        {/* Index + category row */}
        <div className="absolute top-5 left-6 z-20 flex items-baseline gap-3 md:top-6 md:left-7">
          <motion.span
            className="text-white/35 font-black text-3xl md:text-4xl tabular-nums tracking-tighter select-none"
            initial={false}
            animate={{ opacity: isHovered ? 0.25 : 0.5 }}
            transition={{ duration: 0.3 }}
          >
            {indexLabel}
          </motion.span>
          <motion.span
            className="text-[10px] md:text-xs font-semibold uppercase tracking-[0.2em] text-white/50 border border-white/25 rounded-full px-2.5 py-0.5"
            initial={false}
            animate={{ opacity: isHovered ? 0.9 : 0.6, borderColor: isHovered ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.25)" }}
            transition={{ duration: 0.3 }}
          >
            {categoryLabel}
          </motion.span>
        </div>

        {/* Content */}
        <div className="absolute inset-0 z-20 flex flex-col items-start justify-end p-6 md:p-8 pb-6 md:pb-8">
          <motion.div
            className="w-full"
            initial={false}
            animate={{ y: isHovered ? 0 : 6 }}
            transition={{ duration: 0.35 }}
          >
            <div className="relative inline-block pb-1">
              <motion.h2
                className="text-white text-3xl md:text-4xl font-black uppercase tracking-tight leading-[1.1] drop-shadow-[0_2px_20px_rgba(0,0,0,0.5)]"
                initial={false}
                animate={{ filter: isHovered ? "brightness(1.08)" : "brightness(1)" }}
                transition={{ duration: 0.3 }}
              >
                {title || "Service Title"}
              </motion.h2>
              <motion.span
                className="absolute left-0 bottom-0 h-0.5 bg-white/80 rounded-full origin-left"
                initial={false}
                animate={{ scaleX: isHovered ? 1 : 0 }}
                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{ width: "100%" }}
              />
            </div>
            <motion.p
              className="text-white/90 text-sm md:text-base font-medium max-w-xl leading-snug pt-2 drop-shadow-[0_1px_8px_rgba(0,0,0,0.4)]"
              initial={false}
              animate={{
                opacity: isHovered ? 1 : 0.88,
                y: isHovered ? 0 : 6,
              }}
              transition={{ duration: 0.35, delay: isHovered ? 0.05 : 0 }}
            >
              {subText || "Service Subtitle"}
            </motion.p>
          </motion.div>

          {/* Bottom progress line */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/20 rounded-b-2xl origin-left z-20"
            initial={false}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-400/90 rounded-b-2xl origin-left z-20"
            initial={false}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
          />

          {/* CTA - always visible when link exists, stronger on hover */}
          {link && (
            <motion.span
              className="absolute bottom-6 right-6 z-30 flex items-center gap-2 text-white font-semibold text-xs uppercase tracking-widest md:bottom-8 md:right-8"
              initial={false}
              animate={{
                opacity: isHovered ? 1 : 0.5,
                x: isHovered ? 0 : 0,
              }}
              transition={{ duration: 0.25 }}
            >
              <span>{isHovered ? "Explore" : "View"}</span>
              <motion.span
                animate={{ x: isHovered ? [0, 4, 0] : 0 }}
                transition={{ duration: 1.2, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </motion.span>
          )}
        </div>

        {/* Border */}
        <motion.div
          className="absolute inset-0 z-5 pointer-events-none rounded-2xl border border-white/[0.08]"
          initial={false}
          animate={{
            borderColor: isHovered ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.08)",
          }}
          transition={{ duration: 0.35 }}
        />
      </motion.div>
    </motion.div>
  );

  if (link) {
    return (
      <Link
        href={link}
        className="w-full block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-2xl"
      >
        {CardContent}
      </Link>
    );
  }

  return CardContent;
};

export default ServiceCard;
