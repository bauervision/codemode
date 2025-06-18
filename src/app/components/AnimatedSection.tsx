"use client";
import { motion } from "framer-motion";
import chroma from "chroma-js";

type WidthOption = "content" | "full" | "half";

interface AnimatedSectionProps {
  title: string;
  body: string;
  alignment?: "left" | "center" | "right";
  width?: WidthOption;
  padding?: string;
  margin?: string;
  backgroundColor?: string;
  textColor?: string;
  rounded?: boolean;
}

export default function AnimatedSection({
  title,
  body,
  alignment = "center",
  width = "content",
  padding = "p-6",
  margin = "my-10",
  backgroundColor = "#1f2937", // zinc-800 default
  textColor = "#d1d5db", // zinc-300 default
  rounded = false,
}: AnimatedSectionProps) {
  const textAlign =
    alignment === "left"
      ? "text-left"
      : alignment === "right"
      ? "text-right"
      : "text-center";

  const roundedClass = rounded ? "rounded-2xl" : "";

  const widthClass =
    width === "full"
      ? "w-full"
      : width === "half"
      ? "w-[75%] mx-auto"
      : "max-w-3xl mx-auto";

  const contrastPass = chroma.contrast(backgroundColor, textColor) >= 4.5;
  const safeTextColor = contrastPass
    ? textColor
    : chroma.contrast(backgroundColor, "#ffffff") >= 4.5
    ? "#ffffff"
    : "#000000";

  const subtleTextColor = chroma
    .mix(backgroundColor, safeTextColor, 0.85)
    .hex();

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      className={`${margin} ${padding} ${textAlign} ${widthClass} ${roundedClass} shadow-md`}
      style={{ backgroundColor }}
    >
      <h2
        className="text-2xl font-extrabold drop-shadow"
        style={{ color: safeTextColor }}
      >
        {title}
      </h2>
      <p className="mt-2" style={{ color: subtleTextColor }}>
        {body}
      </p>
    </motion.section>
  );
}
