import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import SmoothScroll from "./components/SmoothScroll";
import Drag from "./components/MouseFollower";

export const metadata: Metadata = {
  title: "Motion Pixels",
  description:
    "A creative agency specializing in 3D, motion graphics, VR, architectural lighting design, and more.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <nav className="w-full">
          <Navbar />
        </nav>
        <main>
          {" "}
          <SmoothScroll /> {children}
          <Drag />
        </main>
      </body>
    </html>
  );
}
