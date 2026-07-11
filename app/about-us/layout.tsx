import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Motion Pixels, our creative process, and how we collaborate with filmmakers and brands to build immersive visual experiences.",
  alternates: {
    canonical: "/about-us",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
