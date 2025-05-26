import React from "react";
import Image from "next/image";
import coverImg from "../Assets/Images/Home/Cover_1.jpg";
import "@/public/fonts/Neusharp/Neusharp-Black.css";

const Hero = () => {
  return (
    <div className="relative h-screen w-full  hero">
      <Image
        src={coverImg}
        alt="Cover Image"
        className="object-cover w-full h-full"
        priority
        fill
      />
      <div className="container mx-auto px-4 flex flex-col items-start justify-center h-full space-y-6 z-10 relative">
        <h1 className="text-white text-left font-extrabold uppercase z-20 text-4xl  sm:text-5xl md:text-6xl lg:text-7xl  leading-tight tracking-tight">
          Immersive Design <br /> for the Future
        </h1>
        {/* <button className="z-20 border border-white text-white px-6 py-3 uppercase font-semibold hover:bg-white hover:text-black transition">
          Explore Work
        </button> */}
      </div>
      {/* Optional: dark overlay for better text visibility on mobile */}
      {/* <div className="absolute inset-0 bg-black bg-opacity-40 z-0" /> */}
    </div>
  );
};

export default Hero;
