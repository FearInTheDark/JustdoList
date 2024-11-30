import {useEffect, useState} from "react";
import axios from "axios";

const useLanguage = () => {
    const [currentLanguage, setCurrentLanguageState] = useState(() => localStorage.getItem('current-language'));

    const [translations, setTranslations] = useState(() => localStorage.getItem(`language-${currentLanguage}`));

    const loadLanguage = async (lang) => {
        try {
            const response = await axios.get(route('language', lang));
            const data = response.data;

            localStorage.setItem(`language-${lang}`, JSON.stringify(data));
            localStorage.setItem('current-language', lang);

            setCurrentLanguageState(lang);
            setTranslations(data);

            return data;
        } catch (error) {
            console.error('Error loading language:', error);
            return null;
        }
    };

    const getStoredLanguage = (lang) => {
        return localStorage.getItem(`language-${lang}`)
    };

    const setCurrentLanguage = (lang) => {
        localStorage.setItem('current-language', lang);
        setCurrentLanguageState(lang);
    };

    useEffect(() => {
        if (!currentLanguage) loadLanguage('en').then();
        const stored = localStorage.getItem(`language-${currentLanguage}`);
        if (!stored) {
            loadLanguage(currentLanguage).then()
        }
    }, [currentLanguage]);

    return {
        currentLanguage,
        translations,
        loadLanguage,
        getStoredLanguage,
        setCurrentLanguage,
    };
};

export default useLanguage;
