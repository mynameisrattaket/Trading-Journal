"use client"; // บอกว่าไฟล์นี้ทำงานใน client-side เท่านั้น

import React, { createContext, useState, useContext, useEffect } from "react";
import locales from '../locales';  // Import locales from a file

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // ตรวจสอบว่าอยู่ใน client-side หรือไม่ ก่อนใช้ localStorage
  const [language, setLanguage] = useState(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language");
      return savedLanguage || "en"; // Default to 'en' if no language is set
    }
    return "en"; // Default to 'en' if server-side rendering
  });

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "th" : "en"; // Toggle between languages
    setLanguage(newLanguage);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language); // Save language to localStorage
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, locales }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
