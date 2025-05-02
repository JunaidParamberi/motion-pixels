"use client";
import React, { useState } from "react";
import Image from "next/image";
import contactbg from "../Assets/Images/contact/contact-bg.png";
import { IoIosCall } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

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
        setStatusMessage("Message sent successfully!");
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        setStatusMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setStatusMessage("An error occurred. Please try again.");
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
    <div className="w-full flex items-center justify-center min-h-screen gap-8 py-36 container mx-auto px-4">
      <Image
        src={contactbg}
        alt="Background Image"
        className="fixed inset-0 object-cover w-full h-full -z-20"
        priority
      />
      {/* Black Overlay */}
      <div className="fixed inset-0 bg-black opacity-70 -z-10" />

      {/* Main Content */}
      <div className="flex flex-col items-center text-center gap-8 w-full">
        <h1 className="text-white text-4xl md:text-6xl font-extrabold leading-tight">
          Get in Touch
        </h1>

        <p className="max-w-3xl text-base md:text-lg text-gray-300 leading-relaxed">
          We’re here to help you bring your ideas to life. <br /> Let’s start a
          conversation and explore how we can work together.
        </p>

        <div className="flex flex-col md:flex-row justify-between w-full md:w-2xl py-7 flex-wrap gap-6">
          <span className="flex items-center gap-3">
            <IoIosCall className="text-2xl text-white w-10 h-10" />
            <div className="flex flex-col items-start">
              <span className="text-white font-bold">PHONE</span>
              <a className="text-sm" href="tel:+971556738278">
                +971 55 673 8278
              </a>
            </div>
          </span>
          <span className="flex items-center gap-3">
            <MdEmail className="text-2xl text-white w-10 h-10" />
            <div className="flex flex-col items-start">
              <span className="text-white font-bold">EMAIL</span>
              <a className="text-sm" href="mailto:akhil@motionpixels.me">
                akhil@motionpixels.me
              </a>
            </div>
          </span>
          <span className="flex items-center gap-3">
            <FaLocationDot className="text-2xl text-white w-10 h-10" />
            <div className="flex flex-col items-start">
              <span className="text-white font-bold">LOCATION</span>
              <span className="text-sm">Al Qusais, Dubai - UAE</span>
            </div>
          </span>
        </div>

        {/* Contact Form */}
        <form
          className="flex flex-col gap-4 max-w-full md:max-w-2xl w-full"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleInputChange}
            className="p-4 rounded-md bg-transparent border placeholder-white text-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleInputChange}
            className="p-4 rounded-md bg-transparent border placeholder-white text-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
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
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>

        {statusMessage && <p className="text-white mt-4">{statusMessage}</p>}
      </div>
    </div>
  );
};

export default Page;
