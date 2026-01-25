import { translate } from "./translator";

export async function autoFetch(url, targetLang = "en") {
  const res = await fetch(url);
  const data = await res.json();

  // If the response is text fields, translate automatically
  const translatedData = {};

  for (const key in data) {
    if (typeof data[key] === "string") {
      translatedData[key] = await translate(data[key], targetLang);
    } else {
      translatedData[key] = data[key];
    }
  }

  return translatedData;
}
