"use client";

import React from "react";
import { motion } from "framer-motion";
import ServiceCard from "../components/ServiceCard";
import PageContainer from "../components/PageContainer";
import { servicesListing } from "@/app/data/site-data";

import experianceImg from "../Assets/Images/services/Experiance_img.jpg";
import vfxImg from "../Assets/Images/services/VFX_img.jpg";
import architactureImg from "../Assets/Images/services/Architectural_Img.jpg";

const serviceImages = [experianceImg, vfxImg, architactureImg] as const;

const ServicePage = () => {
  const services = servicesListing.map((item, index) => ({
    ...item,
    image: serviceImages[index],
  }));

  return (
    <PageContainer className="flex flex-col">

      {/* ── Header ───────────────────────────────────────── */}
      <motion.section
        className="pb-16 border-b border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <span className="block text-[10px] tracking-[0.45em] text-white/30 uppercase mb-8">
          Services — Motion Pixels
        </span>
        <h1
          className="font-black text-white leading-none tracking-tight"
          style={{ fontSize: "clamp(3.5rem, 9vw, 7.5rem)" }}
        >
          What We<br />Do<span className="text-white/15">.</span>
        </h1>
      </motion.section>

      {/* ── Cards ────────────────────────────────────────── */}
      <motion.section
        className="py-14 flex flex-col gap-5"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
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
      </motion.section>

    </PageContainer>
  );
};

export default ServicePage;
