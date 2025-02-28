"use client"; // Indicating that this file is intended for client-side rendering only

import React, { createContext, useState, useContext, useEffect } from "react";
import locales from "../locales"; // Import locales from a file

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // State to track whether we are on the client-side
  const [isClient, setIsClient] = useState(false);

  // Language state initialization: set language based on localStorage or default to 'en'
  const [language, setLanguage] = useState("en");

  // On client-side, fetch the saved language preference from localStorage
  useEffect(() => {
    setIsClient(true); // Mark that the component is mounted on the client-side
    const savedLanguage = localStorage.getItem("language");
    setLanguage(savedLanguage || "en"); // Default to 'en' if not set
  }, []);

  // Toggle language function (switches between 'en' and 'th')
  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "th" : "en";
    setLanguage(newLanguage);
  };

  // Save the current language to localStorage whenever it changes
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("language", language);
    }
  }, [language, isClient]);

  // If it's not on the client-side yet, return null or loading state
  if (!isClient) {
    return null; // Or you can render a loading indicator, like <Loading />
  }

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, locales }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
