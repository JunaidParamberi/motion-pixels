import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import SmoothScroll from "./components/SmoothScroll";
import Drag from "./components/MouseFollower";
import { SiteDataProvider } from "./contexts/SiteDataContext";
import InitialLoadReveal from "./components/RouteChangeLoader";
import PageTransition from "./components/PageTransition";

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
        <SiteDataProvider>
          <InitialLoadReveal />
          <nav className="w-full">
            <Navbar />
          </nav>
          <main>
            <SmoothScroll />
            <PageTransition>{children}</PageTransition>
            <Drag />
          </main>
        </SiteDataProvider>
      </body>
    </html>
  );
}
