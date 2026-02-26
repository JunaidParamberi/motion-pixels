"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";

const CaseStudiesPage = () => {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <motion.div
      className="bg-background-light dark:bg-background-dark text-gray-900 dark:text-white font-sans antialiased min-h-screen flex flex-col transition-colors duration-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <main className="flex-grow relative">
        <motion.div
          className="fixed inset-0 -z-10 bg-background-dark overflow-hidden [will-change:transform]"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?q=80&w=2080&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-background-dark/80 via-background-dark/95 to-background-dark" />
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
        </motion.div>

        <section className="pt-40 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
          <motion.h1
            className="font-display font-black text-5xl md:text-7xl lg:text-8xl text-white uppercase tracking-tighter mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            Case Studies
          </motion.h1>
          <motion.p
            className="text-gray-400 text-lg md:text-xl max-w-2xl font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Exploring the intersection of technology and art. We craft
            immersive digital experiences, visual effects, and interactive
            installations that redefine reality.
          </motion.p>

          <motion.div
            className="mt-12 flex flex-wrap gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            {["All", "Immersive", "VFX", "Installations"].map((item, i) => (
              <motion.button
                key={i}
                className={`px-4 py-1 text-sm tracking-widest border-b-2 uppercase font-medium transition-colors ${
                  i === 0
                    ? "border-white text-white"
                    : "border-transparent text-gray-500 hover:text-white hover:border-gray-700"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {item}
              </motion.button>
            ))}
          </motion.div>
        </section>

        <section className="px-6 md:px-12 pb-24 max-w-7xl mx-auto">
          <motion.div
            className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.06, delayChildren: 0.2 },
              },
            }}
          >
            {[
              {
                title: "Neon Genesis",
                tag: "Visual Effects",
                color: "text-blue-400",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAXHEw3WyPZGezWbor9LoFzHafofYNI0jlSDyOV7QHTEAu8mYAXu6BPna6YX5_gUF5GP8PiiBiypKjD0PjZWy47z10TTp0GN1FE_7ZnJkSvixhOyrncJhW0AraHQWSm7zRyXcmbJPeEqY3mkgc7nWMVPlGs6FfjPEMxPK21_jnlufi5oEWSRytRR8ftGQ1x2s8xTCqqlS_r8Db0mU9uP-CkeKRk0KgTajoCr8LabsmWoxaqI6BaohZAgEK3FnIQLM3U85EemvUUMo0Y",
              },
              {
                title: "Core Matrix",
                tag: "Data Viz",
                color: "text-purple-400",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAHGPvW9_8av1TOpuiHTarg0SbebvTQzTe2_GYfhCD8Fun_0uhUmYIkHK3Gj7wygMu8jydUO1WVannz2Oo2c8nFxwk7_5xjiMawYgMhPOMp7gqO8idHRCJVtL-Rsaa4jkxgTcsBymSsEnlSFROy9Wy1iUs-INnRMLZ4HVUragaYa8op5WCb6VkwdFQmwmZRSwvPe1kySKQ-KTvJM2KS1RkIRGo5On8lC_JtozD7nB-t-RdAR12wd-KqKBEjBnNEn43xfKuZzf6sE51B",
              },
              {
                title: "Echoes of Tomorrow",
                tag: "VR Experience",
                color: "text-green-400",
                img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBH4v99ult_ZZ4LdYXmtlRASOnJN1FodT_oTaf8gx_X2sqBAUbZ_pDo2PAtAr9tCa9HBVkjCUvteTSRNgZtEh9YX0aX2cxZvJIF_zRv_dadMGPVhQMkoVGMYgAwjzpDJC8KeMVw6DLrIr84-W-sr7L_eGXWPkhjnDvUZ1pC5tiIDqcK-unienDIkdou8OKMPzskbMBdyZvrs9GnIm6-KUkcqGvKKa7dV5UAK6Nx6QT1XDxyipM0pJgG30Rkw3nVuTDhdPGRvDpTm6wO",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="break-inside-avoid group relative overflow-hidden cursor-pointer"
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
                  },
                }}
                whileHover={{ y: -4 }}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span
                    className={`${item.color} text-xs font-bold tracking-widest uppercase mb-1`}
                  >
                    {item.tag}
                  </span>
                  <h3 className="text-white font-display text-2xl font-bold uppercase tracking-wide">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            ))}

          </motion.div>
        </section>
      </main>
    </motion.div>
  );
};

export default CaseStudiesPage;