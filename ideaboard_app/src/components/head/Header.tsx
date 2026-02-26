"use client"

import { UserButton } from "@/src/components/head/UserButton"
import { Switch } from "antd"
import { useTheme } from "@/src/theme/ThemeProvider"

export const Header = () => {
    const { darkMode, toggle } = useTheme()

    return (
        <header className="flex flex-row gap-4 items-center border-b-2 border-solid border-(--border) ml-4 mr-4 h-20">
            <h1 className="text-[30px] font-bold">Ideenboard</h1>

            <div className="flex flex-1 justify-end items-center gap-4 h-full">

                {/* 🌙 Dark Mode Toggle */}
                <Switch
                    checked={darkMode}
                    onChange={toggle}
                    checkedChildren="🌙"
                    unCheckedChildren="☀️"
                />

                <UserButton />
            </div>
        </header>
    )
}