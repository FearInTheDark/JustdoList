import React, { useEffect, useState } from 'react';

const IntroLogo = ({srcIcon, opacity}) => {
    const [visible, setVisible] = useState(true);
    srcIcon ??= "/storage/app/intro.svg"
    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);

        const handleClick = () => {
            clearTimeout(timer)
            setVisible(false)
        }
        document.addEventListener("click", handleClick)

        return () => clearTimeout(timer);
    }, []);

    if (!visible) return null;

    return (
        <div className={`fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-800 z-[100] ${opacity ? ('opacity-' + opacity) : ''}`}>
            <img src={srcIcon} alt="Logo" className="logo-animation"/>
        </div>
    );
};

export default IntroLogo;

