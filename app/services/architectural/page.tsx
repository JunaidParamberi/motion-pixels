"use client";

import { HiCube, HiViewGrid, HiCollection, HiFilm, HiCursorClick, HiChip } from "react-icons/hi";
import architecturalBg from "@/app/Assets/Images/services/Architectural_Img.jpg";
import { architecturalData } from "@/app/data/site-data";
import ServiceDetailLayout from "@/app/components/ServiceDetailLayout";

const icons = [HiCube, HiViewGrid, HiCollection, HiFilm, HiCursorClick, HiChip];

const cards = architecturalData.items.map((item, i) => ({
  title: item.title,
  description: item.description,
  icon: icons[i % icons.length],
}));

export default function ArchitecturalPage() {
  return (
    <ServiceDetailLayout
      heroImage={architecturalBg}
      heroImageAlt="Architectural visualization and lighting"
      heroLabel="Space, Light & Storytelling"
      heroTitle="Architectural"
      heroSubtitle="High-fidelity visualization, dynamic lighting, and immersive light art for spatial storytelling."
      breadcrumbLabel={architecturalData.title}
      asideParagraphs={[
        "At Motion Pixels, we collaborate closely with architects and studios to craft seamless, photorealistic visualizations for spaces, exhibitions, and streaming content.",
        "Whether it's world-building, dynamic lighting, or immersive installations, we turn imagination into reality—frame by frame.",
      ]}
      asideIcons={[HiCube, HiViewGrid]}
      cards={cards}
    />
  );
}
