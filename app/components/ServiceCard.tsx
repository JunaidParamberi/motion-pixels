import React from "react";
import Image, { StaticImageData } from "next/image";
import serviceImage from "../Assets/Images/services/bg3.jpg";
interface ServiceCardProps {
  image: StaticImageData;
  title: string;
  alt?: string;
  link?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  image,
  title,
  alt,
  link,
}) => {
  return (
    <div className="w-full flex flex-col justify-end items-center h-[200px] relative overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer">
      <div className="absolute inset-0 z-0">
        <Image
          src={image || serviceImage}
          alt={alt || "Service Image"}
          fill
          className="object-cover"
          priority
          sizes="400px"
        />
      </div>
      <h1 className="text-5xl absolute font-bold z-20 w-full top-[40%] left-[10%]">
        {title || "Service Title"}
      </h1>
    </div>
  );
};

export default ServiceCard;
