"use client";
import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { contactData } from "@/app/data/site-data";
import contactbg from "../Assets/Images/contact/contact-bg.png";
import { IoIosCall } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

const CONTACT_BLUR_PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMTAwJyBoZWlnaHQ9JzEwMCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyB2aWV3Qm94PScwIDAgMTAwIDEwMCc+PHJlY3Qgd2lkdGg9JzEwMCcgaGVpZ2h0PScxMDAnIGZpbGw9JyMwMDAwMDAnIC8+PHJlY3QgeD0nLTUnIHk9Jy01JyB3aWR0aD0nMTUwJyBoZWlnaHQ9JzE1MCcgcng9JzIwJyBmaWxsPScjMTMxMzEzJyBvcGFjaXR5PScwLjMnIC8+PC9zdmc+";

const Page = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [statusMessage, setStatusMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("message", formData.message);

      const response = await fetch("https://formspree.io/f/xanoejon", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formDataToSend,
      });

      if (response.ok) {
        setStatusMessage(contactData.successMessage);
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setStatusMessage(contactData.errorMessage);
      }
    } catch (error) {
      console.error(error);
      setStatusMessage(contactData.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      className="w-full flex items-center justify-center min-h-screen gap-8 py-36 container mx-auto px-4 relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="fixed inset-0 -z-20 overflow-hidden [will-change:transform]"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <Image
          src={contactbg}
          alt="Background Image"
          className="object-cover w-full h-full"
          placeholder="blur"
          blurDataURL={CONTACT_BLUR_PLACEHOLDER}
          fill
        />
      </motion.div>
      <div className="fixed inset-0 bg-black opacity-70 -z-10" />

      <div className="flex flex-col items-center text-center gap-8 w-full">
        <motion.h1
          className="text-white text-4xl md:text-6xl font-extrabold leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {contactData.title}
        </motion.h1>

        <motion.p
          className="max-w-3xl text-base md:text-lg text-gray-300 leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          {contactData.intro}
        </motion.p>

        <motion.div
          className="flex flex-col md:flex-row justify-between w-full md:w-2xl py-7 flex-wrap gap-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <span className="flex items-center gap-3">
            <IoIosCall className="text-2xl text-white w-10 h-10" />
            <div className="flex flex-col items-start">
              <span className="text-white font-bold">PHONE</span>
              <a className="text-sm" href={`tel:${contactData.phone.replace(/\s/g, "")}`}>
                {contactData.phone}
              </a>
            </div>
          </span>
          <span className="flex items-center gap-3">
            <MdEmail className="text-2xl text-white w-10 h-10" />
            <div className="flex flex-col items-start">
              <span className="text-white font-bold">EMAIL</span>
              <a className="text-sm" href={`mailto:${contactData.email}`}>
                {contactData.email}
              </a>
            </div>
          </span>
          <span className="flex items-center gap-3">
            <FaLocationDot className="text-2xl text-white w-10 h-10" />
            <div className="flex flex-col items-start">
              <span className="text-white font-bold">LOCATION</span>
              <span className="text-sm">{contactData.location}</span>
            </div>
          </span>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 max-w-full md:max-w-2xl w-full"
        >
          <input
            type="text"
            name="name"
            placeholder={contactData.formPlaceholders.name}
            value={formData.name}
            onChange={handleInputChange}
            className="p-4 rounded-md bg-transparent border placeholder-white text-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <input
            type="email"
            name="email"
            placeholder={contactData.formPlaceholders.email}
            value={formData.email}
            onChange={handleInputChange}
            className="p-4 rounded-md bg-transparent border placeholder-white text-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <textarea
            name="message"
            placeholder={contactData.formPlaceholders.message}
            rows={5}
            value={formData.message}
            onChange={handleInputChange}
            className="p-4 rounded-md bg-transparent border placeholder-white text-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="py-3 px-6 cursor-pointer bg-white text-black rounded-md hover:bg-gray-200 transition focus:outline-none"
          >
            {isSubmitting ? contactData.submittingButton : contactData.submitButton}
          </button>
        </motion.form>

        {statusMessage && <p className="text-white mt-4">{statusMessage}</p>}
      </div>
    </motion.div>
  );
};

export default Page;
