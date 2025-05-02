"use client";
import React from "react";
import Image from "next/image";
import bgImg from "../Assets/Images/about-us/bg1.png";
import ParticlesBackground from "../components/ParticlesBackground";

const AboutUsPage = () => {
  return (
    <div className="relative">
      {/* Background Image */}
      <Image
        src={bgImg}
        alt="Background Image"
        className="fixed inset-0 object-cover w-full h-full -z-20"
        priority
      />

      {/* Black Overlay */}
      <div className="fixed inset-0 bg-black opacity-70 -z-10" />

      {/* Main Content */}
      <div className="w-full flex flex-col items-start min-h-screen justify-center gap-8 py-36 container mx-auto px-4">
        <h1 className="text-white text-7xl font-black text-left">About Us</h1>

        <div className="flex flex-col gap-8 w-full">
          {/* <h2 className="text-white text-4xl text-left font-semibold">
            Who we are?
          </h2> */}

          <p className="max-w-4xl text-lg text-white">
            Motion Pixels is a full-service creative content studio. A community
            of creative pioneers who strive to push creative and technical
            boundaries. Empowered by our heritage, we are focused on building
            the legacy for the future of Motion Pixels.
            <br />
            <br />
            Whether it is our clients, our fellow artists, or anyone who makes
            delivering world-class work possible, our exceptional multimedia
            installation mission and values are the touchstones for who we are,
            how we perform and the content we create.
          </p>

          {/* Quote Section */}

          <blockquote className="text-white py-12 flex justify-start">
            <div className="max-w-3xl relative pl-6">
              <div className="text-[120px] leading-none font-bold absolute -top-10 left-0 text-white/30">
                “
              </div>
              <p className="text-2xl md:text-3xl font-extrabold italic leading-tight relative z-10 text-left">
                We orchestrate pixels for unconventional and <br />
                exceptional multimedia installation
              </p>
            </div>
          </blockquote>

          <p className="max-w-4xl text-lg text-white">
            We collaborate closely with your team, taking the time to understand
            your needs and aspirations. Guiding you through the vast
            possibilities of multimedia and technology, we help define your
            project requirements, develop a unique concept, and turn it into
            reality. From the initial briefing, our team is fully engaged,
            leading the concept development, media design, and production phases
            while seamlessly integrating media and technology. With client
            review checkpoints at every stage, we ensure your team remains
            involved and your vision is realized. Our commitment doesn’t end
            with the launch. We provide ongoing support, including control
            system operation services and continuous assistance to maintain and
            enhance your media content.
          </p>
        </div>
      </div>

      {/* Particle Background */}
      <ParticlesBackground />
    </div>
  );
};

export default AboutUsPage;
