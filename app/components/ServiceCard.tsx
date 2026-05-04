"use client";

import React, { useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
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
  const rotateX = useSpring(mouseY, { stiffness: 200, damping: 30 });
  const rotateY = useSpring(mouseX, { stiffness: 200, damping: 30 });

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
    mouseX.set(y * -5);
    mouseY.set(x * 5);
  };

  const indexLabel = String(index + 1).padStart(2, "0");

  const CardContent = (
    <motion.div
      ref={cardRef}
      className="group w-full relative overflow-hidden cursor-pointer"
      style={{
        height: "clamp(280px, 30vw, 420px)",
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1200,
      } as React.CSSProperties}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      whileInView={{ opacity: 1, y: 0 }}
      initial={{ opacity: 0, y: 36 }}
      viewport={{ once: true, margin: "-60px", amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Image */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: isHovered ? 1.06 : 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Image
          src={image || serviceImage}
          alt={alt || "Service"}
          fill
          className="object-cover"
          placeholder="blur"
          sizes="(max-width: 768px) 100vw, 80vw"
        />
        {videoSrc && isHovered && (
          <video
            ref={videoRef}
            src={videoSrc}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            playsInline
          />
        )}
      </motion.div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.45) 40%, rgba(0,0,0,0.15) 70%, transparent 100%)",
          opacity: isHovered ? 1 : 0.85,
        }}
      />

      {/* Left accent line */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[2px] origin-bottom"
        animate={{
          scaleY: isHovered ? 1 : 0.3,
          backgroundColor: isHovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.3)",
        }}
        transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      {/* Top-left: index + category */}
      <div className="absolute top-5 left-6 flex items-baseline gap-3">
        <span className="text-white font-black tabular-nums leading-none select-none"
          style={{ fontSize: "clamp(1.8rem, 3vw, 3rem)", opacity: isHovered ? 0.2 : 0.4 }}>
          {indexLabel}
        </span>
        {alt && (
          <span className="text-[9px] tracking-[0.35em] uppercase text-white/40 font-medium">
            {alt}
          </span>
        )}
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-20">
        <div className="relative">
          {/* Title underline on hover */}
          <motion.div
            className="absolute -bottom-1 left-0 h-[1px] bg-white/70 origin-left"
            style={{ width: "100%" }}
            animate={{ scaleX: isHovered ? 1 : 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          />
          <h2
            className="text-white font-black uppercase tracking-tight leading-[1.05] drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]"
            style={{ fontSize: "clamp(1.6rem, 2.8vw, 2.8rem)" }}
          >
            {title}
          </h2>
        </div>

        <motion.p
          className="text-white/70 text-sm md:text-base leading-snug mt-3 max-w-2xl line-clamp-2"
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 8 }}
          transition={{ duration: 0.35, delay: isHovered ? 0.05 : 0 }}
        >
          {subText}
        </motion.p>
      </div>

      {/* CTA */}
      {link && (
        <motion.div
          className="absolute bottom-6 right-6 flex items-center gap-2 text-white"
          animate={{ opacity: isHovered ? 1 : 0.35 }}
          transition={{ duration: 0.25 }}
        >
          <span className="text-[10px] tracking-[0.3em] uppercase font-semibold hidden sm:block">
            {isHovered ? "Explore" : "View"}
          </span>
          <motion.span
            animate={{ x: isHovered ? [0, 5, 0] : 0 }}
            transition={{ duration: 1.2, repeat: isHovered ? Infinity : 0, ease: "easeInOut" }}
          >
            <ArrowRight className="w-4 h-4" />
          </motion.span>
        </motion.div>
      )}

      {/* Bottom progress bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/80 origin-left"
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      />

      {/* Border */}
      <motion.div
        className="absolute inset-0 pointer-events-none border"
        animate={{
          borderColor: isHovered ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.06)",
        }}
        transition={{ duration: 0.35 }}
      />
    </motion.div>
  );

  if (link) {
    return (
      <Link
        href={link}
        className="w-full block focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
      >
        {CardContent}
      </Link>
    );
  }

  return CardContent;
};

export default ServiceCard;
