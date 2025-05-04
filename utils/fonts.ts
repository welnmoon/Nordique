// fonts.ts
import { Playfair_Display, Montserrat } from "next/font/google";

export const playfair = Playfair_Display({
  weight: ["400", "600"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const montserrat = Montserrat({
  weight: ["400", "600", "800"],
  subsets: ["latin", "cyrillic"],
  display: "swap",
});
