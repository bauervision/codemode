import chroma from "chroma-js";
import { ColorRoles } from "../types"; // or wherever it's defined

export function generateRandomPalette(): ColorRoles {
  // Pick a random "seed" color and generate a palette
  const seed = chroma.random();
  const scale = chroma
    .scale([seed, seed.set("hsl.h", "+120")])
    .mode("lch")
    .colors(6);

  // Use the generated scale for your 6 roles
  return {
    primary: scale[0],
    secondary: scale[1],
    accent: scale[2],
    background: scale[3],
    surface: scale[4],
    text: scale[5],
  };
}
