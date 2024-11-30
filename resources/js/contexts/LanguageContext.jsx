import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState(() =>  localStorage.getItem("current-language") || "en");
    const [translations, setTranslations] = useState(() => {
        const stored = localStorage.getItem(`language-${currentLanguage}`);
        return stored ? JSON.parse(stored) : {};
    });

    const loadLanguage = async (lang) => {
        try {
            const response = await axios.get(route("language", lang));
            const data = response.data;

            localStorage.setItem(`language-${lang}`, JSON.stringify(data));
            localStorage.setItem("current-language", lang);

            setCurrentLanguage(lang);
            setTranslations(data);
        } catch (error) {
            console.error("Error loading language:", error);
        }
    };

    const switchLanguage = async () => {
        const newLanguage = currentLanguage === "en" ? "vi" : "en";
        // await loadLanguage(newLanguage)
        const stored = localStorage.getItem(`language-${newLanguage}`);
        if (stored) {
            setCurrentLanguage(newLanguage);
            setTranslations(JSON.parse(stored));
            localStorage.setItem("current-language", newLanguage);
        } else {
            await loadLanguage(newLanguage);
        }
    }

    useEffect(() => {
        const stored = localStorage.getItem(`language-${currentLanguage}`);
        if (!stored) {
            loadLanguage(currentLanguage).then();
        }
    }, [currentLanguage]);

    return (
        <LanguageContext.Provider
            value={{ currentLanguage, translations, setCurrentLanguage, loadLanguage, switchLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};


export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};
