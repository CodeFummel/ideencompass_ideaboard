"use client"

import React, { useRef, useState} from 'react';
import {Button, Dropdown, MenuProps, notification, Tabs} from 'antd';
import {FilterOutlined} from "@ant-design/icons";
import {IdeaCreator, IdeaCreatorRef} from "../idea/IdeaCreator";

import {IdeaList} from "@/src/components/idea/IdeaList";
import {useIdeas} from "@/src/components/idea/useIdeas";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const IdeaListWrapper:React.FC = () => {
    const ideas = useIdeas();

    return <IdeaList ideas={ideas}/>;
}

export const DashboardTabs: React.FC = () => {

    const defaultPanes = [
        {
            label: "Ideen",
            key: "ideas-tab",
            closable: false,
            forceRender: true,
            children: <IdeaListWrapper/>,
        },
        {label: "Projekte", key: "projects-tab", closable: false, children: "Projekte yippie"},
        {label: "Umfragen", key: "polls-tab", closable: false, children: "Umfragen yippie"},
    ];

    const [items, setItems] = useState(defaultPanes);
    const [activeKey, setActiveKey] = useState("ideas-tab");
    const newTabIndex = useRef(0);
    const ref = useRef<Map<string, IdeaCreatorRef | null>>(new Map);

    const onChange = (key: string) => {
        setActiveKey(key);
    };

    const [api, contextHolder] = notification.useNotification();

    const add = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        setItems([...items, {
            label: 'Neue Idee',
            children: <IdeaCreator ref={(node) => {
                ref.current.set(newActiveKey, node);
            }} onIdeaSaved={function (): void {
                api.open({
                    title: 'Idee gespeichert!',
                    description: 'Sie haben Ihre Idee erfolgreich abgeschickt.',
                    duration: 5,
                    showProgress: true,
                    pauseOnHover: true,
                    placement: "top",
                });
            }}/>,
            key: newActiveKey,
            closable: true,
            forceRender: false,
        }]);
        setActiveKey(newActiveKey);
    };

    const handleSubmit = () => {
        ref.current.get(activeKey)?.submit();
        remove(activeKey);
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
                {contextHolder}
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