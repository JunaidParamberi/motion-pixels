import type { Metadata } from "next";
import Hero from "./components/Hero";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Discover Motion Pixels: immersive design, cinematic VFX, and AI-powered visual storytelling for future-ready brands.",
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full overflow-hidden">
      <Hero />
    </div>
  );
}
