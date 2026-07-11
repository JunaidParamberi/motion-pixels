"use client";

import { HiViewGrid, HiCursorClick, HiChip, HiCube, HiCollection, HiFilm } from "react-icons/hi";
import experienceBg from "@/app/Assets/Images/services/Experiance_img.jpg";
import ServiceDetailLayout from "@/app/components/ServiceDetailLayout";

const cards = [
  {
    title: "AR, VR & Mixed Reality",
    description: "We build custom immersive worlds that enhance real-world environments or transport users into fully virtual spaces, ideal for exhibitions, events, marketing, and training.",
    icon: HiViewGrid,
  },
  {
    title: "Interactive Contents",
    description: "From responsive installations to touchscreen interfaces, we design content that reacts to user input, offering dynamic engagement and personalization.",
    icon: HiCursorClick,
  },
  {
    title: "AI Integration",
    description: "Leveraging machine learning and artificial intelligence, we enhance content adaptability and interaction, enabling smarter and more intuitive experiences.",
    icon: HiChip,
  },
  {
    title: "Projection Mapping",
    description: "We transform physical spaces with high-precision 3D projection, including projection studies and spatial analysis to create visually stunning environments.",
    icon: HiCube,
  },
  {
    title: "Content Creation",
    description: "Our team develops vibrant, high-quality animations and visual assets, including both 2D and 3D formats, tailored for immersive displays and digital platforms.",
    icon: HiCollection,
  },
  {
    title: "Advanced Animations",
    description: "We bring ideas to motion, whether for product visualization, storytelling, or complex interactive experiences that captivate any audience.",
    icon: HiFilm,
  },
];

export default function ExperiencePage() {
  return (
    <ServiceDetailLayout
      heroImage={experienceBg}
      heroImageAlt="Person floating in digital vortex with vibrant lights"
      heroLabel="Innovation Through Immersion"
      heroTitle="Experience"
      heroSubtitle="Step into the future of digital storytelling where reality blends seamlessly with imagination."
      breadcrumbLabel="Experience"
      asideParagraphs={[
        "At Motion Pixels, our Experience service brings imagination to life by blending technology with storytelling.",
        "We specialize in creating immersive, interactive, and emotionally resonant environments using cutting-edge tools. Whether it's through AR, VR, or MR, we craft unforgettable digital experiences.",
      ]}
      asideIcons={[HiViewGrid, HiCollection]}
      cards={cards}
    />
  );
}
