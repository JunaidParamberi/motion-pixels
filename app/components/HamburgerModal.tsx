// components/HamburgerModal.js
"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function HamburgerModal() {
  const [isOpen, setIsOpen] = useState(false);
  const iconRef = useRef(null);

  const toggleModal = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      {/* Hamburger Icon */}
      <button
        ref={iconRef}
        onClick={toggleModal}
        className="z-50 fixed top-5 left-5 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center"
      >
        ☰
      </button>

      {/* Expanding Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black text-white flex items-center justify-center z-40"
            initial={{
              clipPath: "circle(0% at 2.5rem 2.5rem)",
            }}
            animate={{
              clipPath: "circle(150% at 2.5rem 2.5rem)",
              transition: { duration: 0.6, ease: "easeInOut" },
            }}
            exit={{
              clipPath: "circle(0% at 2.5rem 2.5rem)",
              transition: { duration: 0.4, ease: "easeInOut" },
            }}
          >
            <div className="text-center">
              <h1 className="text-3xl mb-4">Full Screen Modal</h1>
              <button
                onClick={toggleModal}
                className="mt-4 px-4 py-2 bg-white text-black rounded"
              >
                Close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
