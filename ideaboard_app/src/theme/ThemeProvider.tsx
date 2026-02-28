"use client";

import { ConfigProvider, theme } from "antd";
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext({
    darkMode: false,
    toggle: () => {}
});

export const useTheme = () => useContext(ThemeContext);


function getInitialTheme() {
    if (typeof window === "undefined") return false;

    const saved = localStorage.getItem("darkMode");
    if (saved !== null) return saved === "true";

    return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [darkMode, setDarkMode] = useState(getInitialTheme);


    useEffect(() => {
        localStorage.setItem("darkMode", String(darkMode));
        document.documentElement.classList.toggle("dark", darkMode);
    }, [darkMode]);


    useEffect(() => {
        const media = window.matchMedia("(prefers-color-scheme: dark)");

        const listener = (e: MediaQueryListEvent) => {
            const saved = localStorage.getItem("darkMode");
            if (saved === null) {
                setDarkMode(e.matches);
            }
        };

        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, []);

    const toggle = () => setDarkMode(prev => !prev);

    return (
        <ThemeContext.Provider value={{ darkMode, toggle }}>
            <ConfigProvider
                theme={{
                    algorithm: darkMode
                        ? theme.darkAlgorithm
                        : theme.defaultAlgorithm
                }}
            >
                {children}
            </ConfigProvider>
        </ThemeContext.Provider>
    );
}