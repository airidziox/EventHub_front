import React from 'react';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const DarkModeToggle = () => {

    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const enabled = savedTheme === 'dark' || (!savedTheme && prefersDark);

        if (enabled) {
            document.documentElement.classList.add('dark');
            setIsDark(true);
        }
    }, []);

    const toggleDarkMode = () => {
        const html = document.documentElement;
        html.classList.toggle('dark');
        const darkEnabled = html.classList.contains('dark');
        localStorage.setItem('theme', darkEnabled ? 'dark' : 'light');
        setIsDark(darkEnabled);
    };

    return (
        <button
            onClick={toggleDarkMode}
            className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded-full transition-colors
        bg-rose-100 text-rose-700 hover:bg-rose-200 shadow-sm dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
        >
            {isDark ? (
                <>
                    <Moon size={18}/>
                    <span className="text-sm font-medium">Dark</span>
                </>
            ) : (
                <>
                    <Sun size={18}/>
                    <span className="text-sm font-medium">Light</span>
                </>
            )}
        </button>
    );
};

export default DarkModeToggle;