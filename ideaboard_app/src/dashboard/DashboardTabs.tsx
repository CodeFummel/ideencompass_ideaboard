"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Button, Dropdown, MenuProps, Tabs } from 'antd';
import { FilterOutlined } from "@ant-design/icons";
import { IdeaCreator, IdeaCreatorRef } from "./IdeaCreator";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

type Idea = {
    id: string,
    title: string,
}

const IdeaList: React.FC = () => {
    const [ideas, setIdeas] = useState<Idea[]>([]);

    useEffect(() => {
        fetch("/ideas").then((response) => {
            response.json().then((x) => {
                console.info(x);
                setIdeas(x);
            })
        })
    }, []);

    return <div
        className="h-max p-[8px] m-[8px] text-left justify-start border-2 border-solid rounded-(--border-radius) border-(--border)\">
        {ideas.map((idea) => <p key={idea.id}>{idea.title}</p>)}
    </div>;
}

export const DashboardTabs: React.FC = () => {

    const defaultPanes = [
        {
            label: "Ideen",
            key: "ideas-tab",
            closable: false,
            forceRender: true,
            children: <IdeaList/>,
        },
        {label: "Projekte", key: "projects-tab", closable: false, children: "Projekte yippie"},
        {label: "Umfragen", key: "polls-tab", closable: false, children: "Umfragen yippie"},
    ];

    const [items, setItems] = useState(defaultPanes);
    const [activeKey, setActiveKey] = useState("ideas-tab");
    const newTabIndex = useRef(0);
    const ref = useRef<IdeaCreatorRef>(null);

    const onChange = (key: string) => {
        setActiveKey(key);
    };

    const add = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        setItems([...items, {
            label: 'Neue Idee',
            children: <IdeaCreator ref={ref}/>,
            key: newActiveKey,
            closable: true,
            forceRender: false,
        }]);
        setActiveKey(newActiveKey);
    };

    const handleSubmit = () => {
        ref.current?.submit();
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
    const saveIdeaButton = <Button type={"primary"} onClick={handleSubmit}>Idee speichern</Button>

    return (
        <main
            className="flex text-left p-[6px] flex-col flex-2 justify-start gap-(--flex-gap) border-2 border-solid rounded-(--border-radius) border-(--border)">
            <nav className="flex">
                <Tabs
                    className="flex flex-1"
                    tabBarExtraContent={{left: filterButton, right: saveIdeaButton}}
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