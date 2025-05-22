"use client";
import React, { useRef, useState } from "react";
import Image, { StaticImageData } from "next/image";
import serviceImage from "../Assets/Images/services/bg3.jpg";

interface ServiceCardProps {
  image: StaticImageData;
  title: string;
  alt?: string;
  link?: string;
  videoSrc?: string; // Add this prop for video
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  image,
  title,
  alt,
  link,
  videoSrc,
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
      className="w-full flex flex-col justify-end items-center h-[200px] relative overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer"
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
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#05003bba] via-55% via-transparent to-transparent"></div>
      <h1 className="text-5xl absolute font-bold z-20 w-full top-[40%] left-[10%] text-white">
        {title || "Service Title"}
      </h1>
    </div>
  );
};

export default ServiceCard;
