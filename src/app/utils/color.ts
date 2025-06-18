import chroma from "chroma-js";
import { ColorRoles } from "../types";

export function generateRandomPalette(): ColorRoles {
  const seed = chroma.random();

  // Generate a base color scale
  const scale = chroma
    .scale([seed, seed.set("hsl.h", "+120")])
    .mode("lch")
    .colors(5);

  // Manually define background as a darker version of the base seed
  const background = seed.darken(2.5).hex(); // Adjust 2.5 for desired darkness
  const surface = seed.darken(1.5).hex(); // Slightly lighter than background
  const text =
    chroma.contrast(background, "#ffffff") > 4.5 ? "#ffffff" : "#111111";

  return {
    primary: scale[0],
    secondary: scale[1],
    accent: scale[2],
    background,
    surface,
    text,
  };
}
