"use client"

import React, {useRef, useState} from 'react';
import {Button, Dropdown, MenuProps, notification, Tabs} from 'antd';
import {FilterOutlined, SortAscendingOutlined} from "@ant-design/icons";
import {IdeaCreator, IdeaCreatorRef} from "../idea/IdeaCreator";

import IdeaList from "@/src/components/idea/IdeaList";
import {Idea, useIdeas} from "@/src/components/idea/useIdeas";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const IdeaListWrapper: React.FC = () => {
    const ideas = useIdeas();

    const [filter, setFilter] = useState<keyof Idea>("category");
    const [filterValue, setFilterValue] = useState<string>("Sonstiges");
    const [sort, setSort] = useState<keyof Idea>("createdAt");
    /*
        const filteredIdeas = useMemo(() => {
            return ideas
                .filter(idea => idea[filter] === filterValue)
                .sort((a, b) => b[sort] - a[sort])
        }, [ideas, filter, sort]);
    */
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

    type MenuItem = Required<MenuProps>["items"][number];
    const filterOptions: MenuItem[] = [
        {
            key: "category", label: "Kategorie", children: [
                {key: "workplace", label: "Arbeitsplatz"},
                {key: "cafe", label: "Cafe"},
                {key: "hr", label: "HR"},
                {key: "it", label: "IT"},
                {key: "products", label: "Produkte"},
                {key: "else", label: "Sonstiges"},
            ]
        },
        {
            key: "period", label: "Zeitraum", children: [
                {key: "p_today", label: "Heute"},
                {key: "p_three", label: "Drei Tage"},
                {key: "p_week", label: "Woche"},
                {key: "p_month", label: "Monat"},
                {key: "p_all", label: "Immer"},
            ]
        },
    ];

    const sortOptions: MenuItem[] = [
        {
            key: "time", label: "Erstellzeit", children: [
                {key: "t_up", label: "Aufsteigend"},
                {key: "t_down", label: "Absteigend"},
            ]
        },
        {
            key: "likes", label: "Likes", children: [
                {key: "l_up", label: "Aufsteigend"},
                {key: "l_down", label: "Absteigend"},
            ]
        },
        {
            key: "comments", label: "Kommentare", children: [
                {key: "c_up", label: "Aufsteigend"},
                {key: "c_down", label: "Absteigend"},
            ]
        },
    ]

    const filterButton = <div className={"m-2"}>
        <Dropdown trigger={["click"]} menu={{items: filterOptions}}>
            <FilterOutlined className={"mr-2 p-2 border-2 rounded-(--border-radius) border-(--border)"}/>
        </Dropdown>
        <Dropdown trigger={["click"]} menu={{items: sortOptions}}>
            <SortAscendingOutlined className={"p-2 border-2 rounded-(--border-radius) border-(--border)"}/>
        </Dropdown>
    </div>

    const saveIdeaButton = <Button type={"primary"} onClick={handleSubmit}>Idee speichern</Button>

    return (
        <div
            className="flex h-full text-left p-1.5 flex-col flex-2 justify-start gap-(--flex-gap) border-2 border-solid rounded-(--border-radius) border-(--border)">
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