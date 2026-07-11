import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Navbar from "./components/Navbar";
import SmoothScroll from "./components/SmoothScroll";
import Drag from "./components/MouseFollower";
import { SiteDataProvider } from "./contexts/SiteDataContext";
import InitialLoadReveal from "./components/RouteChangeLoader";
import PageTransition from "./components/PageTransition";

export const metadata: Metadata = {
  metadataBase: new URL("https://motionpixels.me"),
  title: {
    default: "Motion Pixels | Cinematic VFX, AI, and Immersive Experiences",
    template: "%s | Motion Pixels",
  },
  description:
    "Motion Pixels is a creative studio delivering cinematic VFX, AI-powered content, immersive experiences, and architectural visualization for brands, events, and film.",
  keywords: [
    "Motion Pixels",
    "VFX studio",
    "AI creative studio",
    "immersive experiences",
    "architectural visualization",
    "projection mapping",
    "3D animation",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Motion Pixels | Cinematic VFX, AI, and Immersive Experiences",
    description:
      "Cinematic visuals, immersive design, and AI-driven creative production for modern brands and storytelling.",
    url: "https://motionpixels.me",
    siteName: "Motion Pixels",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/embed-img.png",
        width: 2932,
        height: 1590,
        alt: "Motion Pixels showcase",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Motion Pixels",
    description:
      "Cinematic VFX, AI-powered content, immersive experiences, and architectural visualization.",
    images: ["/embed-img.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Motion Pixels",
    url: "https://motionpixels.me",
    logo: "https://motionpixels.me/next.svg",
    sameAs: [
      "https://www.instagram.com/motion_pixels.me/?hl=en",
      "https://www.linkedin.com/company/motion-pixels-middle-east/",
    ],
  };

  return (
    <html lang="en">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SiteDataProvider>
          <InitialLoadReveal />
          <nav className="w-full">
            <Navbar />
          </nav>
          <main>
            <SmoothScroll />
            <PageTransition>{children}</PageTransition>
            <footer className="border-t border-white/10 bg-gradient-to-t from-black/45 via-black/20 to-transparent backdrop-blur-[1px]">
              <div className="container mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/40">
                  Motion Pixels
                </span>
                <div className="flex items-center gap-6">
                  <a
                    href="https://www.instagram.com/motion_pixels.me/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors"
                  >
                    Instagram
                  </a>
                  <a
                    href="#"
                    className="text-[10px] tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors"
                  >
                    Behance
                  </a>
                  <a
                    href="https://www.linkedin.com/company/motion-pixels-middle-east/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors"
                  >
                    LinkedIn
                  </a>
                </div>
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/30">
                  © {new Date().getFullYear()} All rights reserved
                </span>
              </div>
            </footer>
            <Drag />
          </main>
          <Analytics />
          <SpeedInsights />
        </SiteDataProvider>
      </body>
    </html>
  );
}
