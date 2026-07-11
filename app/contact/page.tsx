"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { contactData } from "@/app/data/site-data";
import PageContainer from "../components/PageContainer";
import { IoIosCall } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { CircleAlert, CircleCheckBig, Loader2 } from "lucide-react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

function heroTitleLines(title: string): { line1: string; line2: string } {
  const words = title.trim().split(/\s+/).filter(Boolean);
  if (words.length <= 1) return { line1: title, line2: "" };
  const line2 = words.pop() ?? "";
  return { line1: words.join(" "), line2 };
}

const Page = () => {
  const { line1, line2 } = heroTitleLines(contactData.title);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [statusMessage, setStatusMessage] = useState<string>("");
  const [statusType, setStatusType] = useState<"success" | "error" | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage("");
    setStatusType(null);

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
        setStatusType("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatusMessage(contactData.errorMessage);
        setStatusType("error");
      }
    } catch (error) {
      console.error(error);
      setStatusMessage(contactData.errorMessage);
      setStatusType("error");
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
    <PageContainer className="flex flex-col">
      {/* ── Hero (matches services / case-studies / about) ── */}
      <motion.section
        className="pb-16 border-b border-white/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease }}
      >
        <span className="block text-[10px] tracking-[0.45em] text-white/30 uppercase mb-8">
          Contact — Motion Pixels
        </span>
        <h1
          className="font-black text-white leading-none tracking-tight"
          style={{ fontSize: "clamp(3.5rem, 9vw, 7.5rem)" }}
        >
          {line1}
          {line2 ? (
            <>
              <br />
              {line2}
              <span className="text-white/15">.</span>
            </>
          ) : (
            <span className="text-white/15">.</span>
          )}
        </h1>
      </motion.section>

      {/* ── Intro + form ─────────────────────────────────── */}
      <motion.section
        className="py-14 lg:py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.08, ease }}
      >
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="flex flex-col gap-8 text-left lg:pr-4">
            <p className="max-w-3xl text-white/65 text-base md:text-lg leading-relaxed">
              {contactData.intro}
            </p>

            <div className="flex flex-col w-full pt-2 gap-8">
              <span className="flex items-start gap-4">
                <IoIosCall className="text-xl text-white/40 w-9 h-9 shrink-0 mt-0.5" aria-hidden />
                <div className="flex flex-col items-start gap-1">
                  <span className="text-[10px] tracking-[0.35em] text-white/35 uppercase">
                    Phone
                  </span>
                  <a
                    className="text-sm text-white/70 hover:text-white transition-colors"
                    href={`tel:${contactData.phone.replace(/\s/g, "")}`}
                  >
                    {contactData.phone}
                  </a>
                </div>
              </span>
              <span className="flex items-start gap-4">
                <MdEmail className="text-xl text-white/40 w-9 h-9 shrink-0 mt-0.5" aria-hidden />
                <div className="flex flex-col items-start gap-1">
                  <span className="text-[10px] tracking-[0.35em] text-white/35 uppercase">
                    Email
                  </span>
                  <a
                    className="text-sm text-white/70 hover:text-white transition-colors break-all"
                    href={`mailto:${contactData.email}`}
                  >
                    {contactData.email}
                  </a>
                </div>
              </span>
              <span className="flex items-start gap-4">
                <FaLocationDot className="text-xl text-white/40 w-9 h-9 shrink-0 mt-0.5" aria-hidden />
                <div className="flex flex-col items-start gap-1">
                  <span className="text-[10px] tracking-[0.35em] text-white/35 uppercase">
                    Location
                  </span>
                  <span className="text-sm text-white/70">{contactData.location}</span>
                </div>
              </span>
            </div>
          </div>

          <div className="w-full lg:max-w-xl lg:ml-auto">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 max-w-full w-full"
            >
              <input
                type="text"
                name="name"
                placeholder={contactData.formPlaceholders.name}
                value={formData.name}
                onChange={handleInputChange}
                className="p-4 bg-white/[0.04] border border-white/10 placeholder-white/40 text-white/90 focus:outline-none focus:border-white/25 focus:bg-white/[0.06] transition-colors"
                required
              />
              <input
                type="email"
                name="email"
                placeholder={contactData.formPlaceholders.email}
                value={formData.email}
                onChange={handleInputChange}
                className="p-4 bg-white/[0.04] border border-white/10 placeholder-white/40 text-white/90 focus:outline-none focus:border-white/25 focus:bg-white/[0.06] transition-colors"
                required
              />
              <textarea
                name="message"
                placeholder={contactData.formPlaceholders.message}
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                className="p-4 bg-white/[0.04] border border-white/10 placeholder-white/40 text-white/90 focus:outline-none focus:border-white/25 focus:bg-white/[0.06] transition-colors resize-y min-h-[140px]"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="py-3 px-6 cursor-pointer bg-white text-black font-semibold hover:bg-white/90 disabled:opacity-70 disabled:cursor-not-allowed transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 inline-flex items-center justify-center gap-2"
              >
                {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" aria-hidden />}
                {isSubmitting ? contactData.submittingButton : contactData.submitButton}
              </button>
            </form>

            {statusMessage && (
              <motion.div
                className={`mt-4 border px-4 py-3 flex items-start gap-2 ${
                  statusType === "success"
                    ? "border-emerald-400/40 bg-emerald-500/10 text-emerald-200"
                    : "border-rose-400/40 bg-rose-500/10 text-rose-200"
                }`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                role="status"
                aria-live="polite"
              >
                {statusType === "success" ? (
                  <CircleCheckBig className="w-4 h-4 mt-0.5 shrink-0" aria-hidden />
                ) : (
                  <CircleAlert className="w-4 h-4 mt-0.5 shrink-0" aria-hidden />
                )}
                <p className="text-sm leading-relaxed">{statusMessage}</p>
              </motion.div>
            )}
          </div>
        </div>
      </motion.section>
    </PageContainer>
  );
};

export default Page;
