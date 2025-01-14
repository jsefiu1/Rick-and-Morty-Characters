import React, { createContext, useContext, useState } from "react";

// translations for English and German
const languages = {
  en: {
    status: "Status",
    species: "Species",
    gender: "Gender",
    origin: "Origin",
    sort: "Sort",
    alive: "Alive",
    dead: "Dead",
    unknown: "Unknown",
  },
  de: {
    status: "Status",
    species: "Spezies",
    gender: "Geschlecht",
    origin: "Herkunft",
    sort: "Sortieren",
    alive: "Lebendig",
    dead: "Tot",
    unknown: "Unbekannt",
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en"); // Default language is English

  // Function to toggle between English and German
  const toggleLanguage = () => {
    setLanguage((prevLang) => (prevLang === "en" ? "de" : "en"));
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translations: languages[language] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};
