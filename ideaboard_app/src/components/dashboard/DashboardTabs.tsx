"use client"

import React, {useEffect, useRef, useState} from 'react';
import {Button, Collapse, Dropdown, MenuProps, Tabs} from 'antd';
import {FilterOutlined} from "@ant-design/icons";
import {IdeaCreator, IdeaCreatorRef} from "./IdeaCreator";
import {IdeaComponent} from "./IdeaComponent";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

type Idea = {
    id: number,
    title: string,
    category: string,
    tags: string[],
    body: string,
    authorName: string,
    files: {name: string, data: string}[],
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


    const items = ideas.map((idea) => (
        {
            key: idea.id,
            label:<div className={"flex justify-between"}>
                <h4 className={"text-[1.2rem] font-medium"}>{idea.title}</h4>
                <span className={"place-self-center text-[1rem] "}>Von {idea.authorName}</span>
            </div>,
            children: <IdeaComponent {...idea}/>
        }
    ));

    return <div className={"overflow-auto"}>
        <Collapse className={"p-0"} size={"small"} items={items}></Collapse>
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
        <div
            className="flex h-full text-left p-[6px] flex-col flex-2 justify-start gap-(--flex-gap) border-2 border-solid rounded-(--border-radius) border-(--border)">
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
        </div>
    );
};