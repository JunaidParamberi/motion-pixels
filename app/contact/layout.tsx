import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start your next project with Motion Pixels. Contact our team for VFX, AI-driven production, immersive media, and architectural visualization.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
