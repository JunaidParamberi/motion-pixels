"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Logo from "./Assets/Logo/Logo White.svg"; // Adjust the path if needed

const Loading = () => {
  return (
    <motion.div
      key="loader"
      className="fixed w-screen h-screen flex justify-center items-center inset-0 z-[9999] bg-black text-white"
      initial={{
        clipPath: "circle(0% at 50% 50%)", // Start from the center (circle effect)
      }}
      animate={{
        clipPath: "circle(150% at 50% 50%)", // Expand the circle to reveal the entire screen
      }}
      exit={{
        opacity: 0,
        transition: { duration: 0.3 },
      }}
      transition={{
        duration: 1.4,
        ease: "easeInOut",
      }}
    >
      {/* Logo Centered */}
      <div className="z-50">
        <Image src={Logo} alt="Logo" width={260} />
      </div>
    </motion.div>
  );
};

export default Loading;
