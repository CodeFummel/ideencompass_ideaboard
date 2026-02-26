"use client"

import React from 'react'
import type { TabsProps } from 'antd'
import { Tabs } from 'antd'

import { Footer } from "@/src/components/Footer";
import { Header } from "@/src/components/head/Header";
import { Home } from "@/src/components/home/Home";
import { Dashboard } from "@/src/components/dashboard/Dashboard";
import { Statistics } from "@/src/components/statistics/Statistics";
import { LoginPage } from "@/src/components/user/LoginPage";
import { AdminUserManagment } from "@/src/components/user/AdminUserManagment"
import { authClient } from "@/src/utils/auth-client";
import { TabsProvider } from "@/src/components/TabsProvider";

import { ThemeProvider } from "@/src/theme/ThemeProvider"   // ⭐ NEU

const onChange = (key: string) => {
    console.log(key);
};

export const Main: React.FC = () => {
    const {
        data: session,
        isPending,
        refetch
    } = authClient.useSession();

    if (isPending) {
        return null;
    }

    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "Home",
            children: <Home />,
        },
        {
            key: "2",
            label: "Dashboard",
            children: <Dashboard />,
        },
        {
            key: "3",
            label: "Statistiken",
            children: <Statistics />,
        },
        session?.user.role === "admin"
            ? {
                key: "4",
                label: "Nutzerverwaltung",
                children: <AdminUserManagment />,
            }
            : null,
    ].filter(item => item != null);

    return (
        <ThemeProvider>   {/* ⭐ HIER WRAPPEN */}
            <div className="flex flex-col h-full"
                 style={{
                     background: "var(--ant-color-bg-layout)",
                     color: "var(--ant-color-text)"
                 }}>
                <Header />

                {session ? (
                    <TabsProvider>
                        <Tabs
                            className="flex flex-1 overflow-y-auto overflow-x-hidden"
                            defaultActiveKey="1"
                            centered
                            items={items}
                            onChange={onChange}
                        />
                    </TabsProvider>
                ) : (
                    <LoginPage onLoggedIn={refetch} />
                )}

                <Footer />
            </div>

        </ThemeProvider>
    );
};