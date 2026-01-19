"use client"

import React from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'

import { Footer } from "@/src/components/Footer";
import { Header } from "@/src/app/Head/Header";
import { Home } from "@/src/components/home/Home";
import { Dashboard } from "@/src/components/dashboard/Dashboard";
import { Statistics } from "@/src/components/statistics/Statistics";
import LoginPage from "@/src/components/LoginPage";

const onChange = (key: string) => {
    console.log(key);
};

const items: TabsProps["items"] = [
    {
        key: "1",
        label: "Home",
        children: <Home/>,
    },
    {
        key: "2",
        label: "Dashboard",
        children: <Dashboard/>,
    },
    {
        key: "3",
        label: "Statisken",
        children: <Statistics/>,
    },
]

export const Main: React.FC = () => {
    const loggedIn = false;

    return(
        <div className={"flex flex-col h-full"}>
            <Header/>
            {loggedIn ? <Tabs className={"flex flex-1 overflow-y-auto overflow-x-hidden"}
                  defaultActiveKey="1"
                  centered
                  items={items}
                  onChange={onChange}/>: <LoginPage/>}
            <Footer/>
        </div>
    );
};