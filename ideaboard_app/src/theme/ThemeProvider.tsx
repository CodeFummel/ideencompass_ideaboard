"use client"

import { ConfigProvider, theme } from "antd"
import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext({
    darkMode: false,
    toggle: () => {}
})

export const useTheme = () => useContext(ThemeContext)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [darkMode, setDarkMode] = useState(false)

    /* 🌗 Initial: localStorage → sonst System */
    useEffect(() => {
        const saved = localStorage.getItem("darkMode")

        if (saved !== null) {
            setDarkMode(saved === "true")
        } else {
            const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
            setDarkMode(prefersDark)
        }
    }, [])


    useEffect(() => {
        localStorage.setItem("darkMode", String(darkMode))

        document.documentElement.classList.toggle("dark", darkMode)
    }, [darkMode])

    const toggle = () => setDarkMode(prev => !prev)

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
    )
}