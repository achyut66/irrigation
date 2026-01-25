import { translate } from "./translator";
import { useLanguage } from "@/context/LanguageContext";

export async function autoFetch(url) {
  const { language } = useLanguage();

  const res = await fetch(url);
  const data = await res.json();

  if (language === "NP") return data; // Nepali = no translation

  const translatedData = {};
  for (const key in data) {
    const value = data[key];
    translatedData[key] =
      typeof value === "string" ? await translate(value, "en") : value;
  }

  return translatedData;
}
