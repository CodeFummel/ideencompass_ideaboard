"use client"

import {useState} from "react";
import {Button, Dropdown, MenuProps, Tabs} from 'antd';
import {FilterOutlined} from "@ant-design/icons";

export const Main = () => {

    const createIdeaButton = <Button type={"primary"} onClick={() => newIdea("Hallo")}>Idee erstellen</Button>
    const [ideas, setIdeas] = useState(["Idea 1", "Idea 2", "Idea 3"]);
    const newIdea = (idea) => {
        setIdeas((ideas) => [...ideas, idea])
    };
    const mainTabs = [
        {
            label: "Ideen",
            key: "ideas-tab",
            children: <div
                className="h-max p-[8px] m-[8px] text-left justify-start border-2 border-solid rounded-(--border-radius) border-(--border)\">
                {ideas.map((idea, i) => <p key={i}>{idea}</p>)}
            </div>
        },
        {label: "Projekte", key: "projects-tab", children: "Projekte yippie"},
        {label: "Umfragen", key: "polls-tab", children: "Umfragen yippie"},
    ];
    const filterOptions: MenuProps["items"] = [
        {
            label: "Best",
            key: "1",
        },
        {
            label: "New",
            key: "2",
        },
        {
            label: "Old",
            key: "3",
        },
    ];
    const filterButton = <Dropdown trigger={["click"]} menu={{items: filterOptions}}><FilterOutlined/></Dropdown>


    return (
        <main
            className="min-h-[0] p-[8px] m-[8px] text-left flex flex-col flex-2 justify-start gap-(--flex-gap) border-2 border-solid rounded-(--border-radius) border-(--border)">
            <div className="flex justify-between">
                <nav className="flex flex-1">
                    <Tabs type={"card"} items={mainTabs} defaultActiveKey={"ideas-tab"}
                          tabBarExtraContent={{left: filterButton, right: createIdeaButton}}/>
                </nav>
            </div>
        </main>
    );
};
