"use client";

import { HiFilm, HiCollection, HiChip, HiViewGrid } from "react-icons/hi";
import aiBg from "@/app/Assets/Images/services/VFX_img.jpg";
import { artificialIntelligenceData } from "@/app/data/site-data";
import ServiceDetailLayout from "@/app/components/ServiceDetailLayout";

const icons = [HiFilm, HiCollection, HiChip, HiViewGrid];

const cards = artificialIntelligenceData.items.map((item, i) => ({
  title: item.title,
  description: item.description,
  icon: icons[i % icons.length],
}));

export default function ArtificialIntelligencePage() {
  return (
    <ServiceDetailLayout
      heroImage={aiBg}
      heroImageAlt="AI and visual effects"
      heroLabel="AI-Powered Creativity"
      heroTitle={<>Artificial<br />Intelligence</>}
      heroSubtitle="We combine advanced AI tools with creative artistry to transform imagination into cinematic reality—frame by frame."
      breadcrumbLabel={artificialIntelligenceData.title}
      asideParagraphs={[
        "At Motion Pixels, we combine advanced AI tools with creative artistry to help filmmakers and studios craft seamless, photorealistic visuals.",
        "Whether it's AI-assisted world-building, intelligent creature animation, or complex dynamic simulations, we transform imagination into cinematic reality—frame by frame.",
      ]}
      asideIcons={[HiChip, HiFilm]}
      cards={cards}
    />
  );
}
