import React from "react";
import Image from "next/image";
import coverImg from "../Assets/Images/Home/Cover_1.jpg";

const Hero = () => {
  return (
    <div className="relative h-full w-full">
      <Image
        src={coverImg}
        alt="Cover Image"
        className="object-cover w-full h-full"
        priority
        fill
      />
      <div className="container mx-auto px-4 flex flex-col items-start justify-center h-full space-y-4">
        <h1 className="text-white text-left text-7xl font-extrabold uppercase z-20">
          Immersive Design <br /> for the Future
        </h1>
        <button className="z-20 border-2 border-white text-white px-6 py-2 uppercase font-semibold hover:bg-white hover:text-black transition">
          Explore Work
        </button>
      </div>
    </div>
  );
};

export default Hero;
