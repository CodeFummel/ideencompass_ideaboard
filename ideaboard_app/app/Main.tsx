"use client"

import React, {useRef, useState} from 'react';
import {Button, Dropdown, MenuProps, Tabs} from 'antd';
import {FilterOutlined} from "@ant-design/icons";
import {IdeaCreator} from "./IdeaCreator";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

export const Main: React.FC = () => {

    const [ideas, setIdeas] = useState(["Idea 1", "Idea 2", "Idea 3"]);
    const newIdea = (idea) => {
        setIdeas((ideas) => [...ideas, idea])
    };

    const defaultPanes = [
        {
            label: "Ideen",
            key: "ideas-tab",
            closable: false,
            children: <div
                className="h-max p-[8px] m-[8px] text-left justify-start border-2 border-solid rounded-(--border-radius) border-(--border)\">
                {ideas.map((idea, i) => <p key={i}>{idea}</p>)}
            </div>
        },
        {label: "Projekte", key: "projects-tab", closable: false, children: "Projekte yippie"},
        {label: "Umfragen", key: "polls-tab", closable: false, children: "Umfragen yippie"},
    ];

    const [items, setItems] = useState(defaultPanes);
    const [activeKey, setActiveKey] = useState("ideas-tab");
    const newTabIndex = useRef(0);

    const onChange = (key: string) => {
        setActiveKey(key);
    };

    const add = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        // @ts-ignore
        setItems([...items, {
            label: 'New Idea',
            children:<IdeaCreator/>,
            key: newActiveKey}]);
        setActiveKey(newActiveKey);
    };

    const remove = (targetKey: TargetKey) => {
        const targetIndex = items.findIndex((pane) => pane.key === targetKey);
        const newPanes = items.filter((pane) => pane.key !== targetKey);
        if (newPanes.length && targetKey === activeKey) {
            const {key} = newPanes[targetIndex === newPanes.length ? targetIndex - 1 : targetIndex];
            setActiveKey(key);
        }
        setItems(newPanes);
    };

    const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
        if (action === 'add') {
            add();
        } else {
            remove(targetKey);
        }
    };


    const createIdeaButton = <Button type={"primary"} onClick={add}>Idee erstellen</Button>

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
            <nav className="flex">
                <Tabs
                    className="flex flex-1"
                    tabBarExtraContent={{left: filterButton, right: createIdeaButton}}
                    hideAdd
                    onChange={onChange}
                    activeKey={activeKey}
                    type={"editable-card"}
                    defaultActiveKey={"ideas-tab"}
                    onEdit={onEdit}
                    items={items}
                />
            </nav>
        </main>
    );
};

//export default Main;