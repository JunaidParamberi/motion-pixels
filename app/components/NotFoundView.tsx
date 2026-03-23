"use client";

import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function NotFoundView() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleGoBack = () => {
    if (pathname === "/" && window.history.length > 1) {
      router.back();
      return;
    }

    const segments = pathname.split("/").filter(Boolean);
    const parentPath = segments.length > 1 ? `/${segments.slice(0, -1).join("/")}` : "/";
    const query = searchParams.toString();
    const targetHref = query.length > 0 && parentPath !== "/" ? `${parentPath}?${query}` : parentPath;
    router.push(targetHref);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
      <section className="relative flex-1 flex items-center justify-center px-4 sm:px-6 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,255,0.15),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(244,114,182,0.12),_transparent_60%)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <p className="text-xs font-bold tracking-[0.3em] uppercase text-white/40">Error 404</p>
          <h1 className="font-extrabold text-5xl md:text-7xl lg:text-8xl tracking-tighter uppercase leading-tight">
            Page Not Found
          </h1>
          <p className="max-w-xl mx-auto text-sm md:text-base font-light leading-relaxed text-white/70">
            The route you&apos;re looking for doesn&apos;t exist or has been moved. Explore our work or
            head back to the main grid of projects.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
            <button
              onClick={handleGoBack}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/40 text-[11px] font-bold tracking-[0.25em] uppercase text-white/80 hover:text-white hover:border-white hover:bg-white/5 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden />
              Go Back
            </button>
            <button
              onClick={() => router.push("/")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-[11px] font-bold tracking-[0.25em] uppercase hover:bg-white/90 transition-colors"
            >
              Go Home
            </button>
          </div>
        </div>
      </section>

      <footer className="bg-black py-6 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/30">
            Motion Pixels
          </span>
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/20">
            © {new Date().getFullYear()} Motion Pixels
          </p>
        </div>
      </footer>
    </main>
  );
}
