import React from "react";
import ServiceCard from "../components/ServiceCard";
import { title } from "process";
import Image from "next/image";

import sampleImage from "../Assets/Images/services/Screenshot 2025-05-19 at 12.54.53 AM.png";
import experianceImg from "../Assets/Images/services/Experiance_img.jpg";
import vfxImg from "../Assets/Images/services/VFX_img.jpg";
import architactureImg from "../Assets/Images/services/Architectural_Img.jpg";

import ParticlesBackground from "../components/ParticlesBackground";

const ServicePage = () => {
  const services = [
    {
      // videoSrc: "/video/irefly-experience.mp4",
      image: experianceImg,
      title: "Experience",
      alt: "Experience",
      link: "/services/service1",
    },
    {
      image: vfxImg,
      title: "VFX",
      alt: "VFX",
      link: "/services/service1",
    },
    {
      image: architactureImg,
      title: "Architectural",
      alt: "Architectural",
      link: "/services/service1",
    },
  ];
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen gap-8 py-36 container mx-auto px-4">
      <ParticlesBackground />
      {/* <Image
        src={sampleImage}
        alt="Background Image"
        className="fixed inset-0 object-cover w-full h-full -z-20 "
        priority
      /> */}
      <video
        autoPlay
        src="/video/irefly-experience.mp4"
        className="fixed inset-0 object-cover w-full h-full -z-20 transition-opacity duration-1000"
        muted
        loop
        playsInline
        style={{ opacity: 0.7 }}
      />
      {/* Black Overlay */}
      <div className="fixed inset-0 bg-black opacity-60 -z-10" />
      <h1 className="text-white text-4xl md:text-6xl font-extrabold text-left w-full leading-tight">
        What We Do
      </h1>

      <div className="w-full  flex-col flex  gap-6 justify-center">
        {/* Map through the services array to render ServiceCard components */}
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            image={service.image}
            title={service.title}
            alt={service.alt}
            link={service.link}
          />
        ))}
      </div>
    </div>
  );
};

export default ServicePage;
