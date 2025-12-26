"use client"

import React from 'react'
import { Tabs } from 'antd'
import type { TabsProps } from 'antd'

import { Footer } from "@/src/Footer";
import { Header } from "@/src/app/Head/Header";
import { Home } from "@/src/home/Home";
import { Dashboard } from "@/src/dashboard/Dashboard";
import { Statistics } from "@/src/statistics/Statistics";

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
    return(
        <div className={"flex flex-col h-full"}>
            <Header/>
            <Tabs className={"flex flex-1 overflow-y-auto overflow-x-hidden"}
                  defaultActiveKey="1"
                  centered
                  items={items}
                  onChange={onChange}/>
            <Footer/>
        </div>
    );
};