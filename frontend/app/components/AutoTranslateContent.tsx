"use client";
import { useEffect, useState } from "react";
import { freeTranslate } from "@/lib/freeTranslate";

export default function AutoTranslateContent({ text, lang }) {
  const [translated, setTranslated] = useState(text);

  useEffect(() => {
    if (lang === "ne") {
      setTranslated(text);
      return;
    }

    const run = async () => {
      const t = await freeTranslate(text, "ne", lang);
      setTranslated(t);
    };

    run();
  }, [lang, text]);

  return <div>{translated}</div>;
}
