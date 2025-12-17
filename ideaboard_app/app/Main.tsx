"use client"

import React from 'react'
import { Tabs } from 'antd'
import type {TabsProps } from 'antd'

import { Dashboard } from "@/app/src/dashboard/Dashboard";
import {Footer} from "@/app/src/Footer";
import {Header} from "@/app/src/Header";

const onChange = (key: string) => {
    console.log(key);
};

const items: TabsProps["items"] = [
    {
        key: "1",
        label: "Home",
        children: "Home Site",
    },
    {
        key: "2",
        label: "Dashboard",
        children: <Dashboard/>,
    },
    {
        key: "3",
        label: "Settings",
        children: "Setting Site",
    }
]

export const Main: React.FC = () => {
    return(
        <div className={"flex flex-col h-full"}>
            <Header/>
            <Tabs className={"flex flex-1 overflow-y-auto overflow-x-hidden"} defaultActiveKey="1" items={items} onChange={onChange}/>
            <Footer/>
        </div>
    );
};