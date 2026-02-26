"use client";

import React from "react";
import { motion } from "framer-motion";
import ServiceCard from "../components/ServiceCard";
import dynamic from "next/dynamic";
import { servicesListing } from "@/app/data/site-data";

import sampleImage from "../Assets/Images/services/Screenshot 2025-05-19 at 12.54.53 AM.png";
import experianceImg from "../Assets/Images/services/Experiance_img.jpg";
import vfxImg from "../Assets/Images/services/VFX_img.jpg";
import architactureImg from "../Assets/Images/services/Architectural_Img.jpg";

const ParticlesBackground = dynamic(
  () => import("../components/ParticlesBackground"),
  { ssr: false, loading: () => null }
);

const serviceImages = [experianceImg, vfxImg, architactureImg] as const;

const ServicePage = () => {
  const services = servicesListing.map((item, index) => ({
    ...item,
    image: serviceImages[index],
  }));

  return (
    <motion.div
      className="w-full flex flex-col items-center justify-center min-h-screen gap-8 py-30 container mx-auto px-4 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ParticlesBackground />
      <motion.div
        className="fixed inset-0 -z-20 overflow-hidden [will-change:transform]"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <video
          autoPlay
          src="/video/irefly-experience.mp4"
          className="object-cover w-full h-full"
          muted
          loop
          playsInline
          preload="metadata"
          poster={sampleImage.src}
          style={{ opacity: 0.7 }}
        />
      </motion.div>
      <div className="fixed inset-0 bg-black opacity-60 -z-10" />
      <motion.h1
        className="text-white text-4xl md:text-6xl font-extrabold text-left w-full leading-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        What We Do
      </motion.h1>

      <motion.div
        className="w-full flex-col flex gap-6 justify-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.1, delayChildren: 0.2 },
          },
        }}
      >
        {services.map((service, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 24 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
              },
            }}
          >
            <ServiceCard
              image={service.image}
              title={service.title}
              alt={service.alt}
              link={service.link}
              subText={service.subText}
              index={index}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ServicePage;
