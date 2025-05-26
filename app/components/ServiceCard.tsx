"use client";
import React, { useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import serviceImage from "../Assets/Images/services/bg3.jpg";

interface ServiceCardProps {
  image: StaticImageData;
  title: string;
  alt?: string;
  link?: string;
  subText?: string; // Optional prop for subtitle
  videoSrc?: string; // Add this prop for video
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  image,
  title,
  alt,
  link,
  videoSrc,
  subText,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="w-full flex flex-col justify-end items-center h-[200px] max-md:h-[250px] relative overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 z-0">
        {videoSrc && isHovered ? (
          <video
            ref={videoRef}
            src={videoSrc}
            className="object-cover w-full h-full"
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            muted
            loop
            playsInline
          />
        ) : (
          <Image
            src={image || serviceImage}
            alt={alt || "Service Image"}
            fill
            className="object-cover"
            priority
          />
        )}
      </div>
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#05003bba] via-35% via-[#04012a64] max-md:via-70% max-md:via-[#00000087]  to-transparent"></div>
      <div className="absolute inset-0 z-20 flex flex-col items-start justify-center p-4 px-10">
        <h1 className="text-4xl max-md:text-3xl font-bold  w-full top-[40%]  text-white pb-3">
          {title || "Service Title"}
        </h1>
        <h2 className=" w-full text-lg font-medium  text-white  ">
          {subText || "Service Subtitle"}
        </h2>
      </div>
    </div>
  );
};

export default ServiceCard;
