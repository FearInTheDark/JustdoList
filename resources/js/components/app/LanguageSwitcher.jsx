import React from 'react';
import {useLanguage} from "@/contexts/LanguageContext"

const LanguageSwitcher = () => {

    const {switchLanguage} = useLanguage()

    return (
        <li className="rounded-full flex items-center p-2 hover:bg-gray-100 hover:shadow-sm dark:hover:bg-gray-700 text-black/70 transform duration-300"
            onClick={switchLanguage}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                 viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                 className="lucide lucide-languages dark:text-gray-50">
                <path d="m5 8 6 6"/>
                <path d="m4 14 6-6 2-3"/>
                <path d="M2 5h12"/>
                <path d="M7 2h1"/>
                <path d="m22 22-5-10-5 10"/>
                <path d="M14 18h6"/>
            </svg>
        </li>
    );
};

export default LanguageSwitcher;
