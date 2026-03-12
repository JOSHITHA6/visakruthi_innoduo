import { createContext, useContext, useEffect, useState } from "react";

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    document.documentElement.lang = language === "te" ? "te" : "en";
    document.body.dataset.language = language;
  }, [language]);

  const value = {
    language,
    toggleLanguage: () => setLanguage((current) => (current === "en" ? "te" : "en")),
    text: (en, te) => (language === "te" && te ? te : en)
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
