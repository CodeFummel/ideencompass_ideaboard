"use client"

import React, {useCallback, useContext, useMemo, useRef, useState} from 'react';
import {Button, Dropdown, MenuProps, notification, Tabs} from 'antd';
import {FilterOutlined, SortAscendingOutlined} from "@ant-design/icons";
import {IdeaCreator, IdeaCreatorRef} from "../idea/IdeaCreator";

import IdeaList from "@/src/components/idea/IdeaList";
import {Idea, useIdeas} from "@/src/components/idea/useIdeas";
import {PollList} from "@/src/components/poll/PollList";
import {ProjectList} from "@/src/components/project/ProjectList";
import {useProjects} from "@/src/components/project/useProjects";
import {TabsContext} from "@/src/components/TabsProvider";
import {sortByComments, sortByCreatedAt, sortByLikes} from "./useSort";
import dayjs from "dayjs";

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;
type Filter = {
    type: "category",
    value: string
} | {
    type: "time",
    value: dayjs.OpUnitType | "all"
}
type SortFunction = "createdAt" | "likes" | "comments"

const IdeaListWrapper = ({ideas, onIdeaEdit, filter, sort, sortDirection}: {
    ideas: Idea[]
    onIdeaEdit: (id: number) => void
    filter: Filter
    sort: SortFunction
    sortDirection: boolean
}) => {

    const filteredIdeas = useMemo(() => {
        return ideas
            .filter(idea => {
                switch (filter.type) {
                    case "category":
                        return (idea.category === filter.value);
                    case "time":
                        return (filter.value === "all" ? true : dayjs(idea.createdAt).diff(dayjs(), filter.value) === 0);
                }
            })
            .sort((a, b) => {
                switch (sort) {
                    case "createdAt":
                        return sortByCreatedAt(a, b, sortDirection);
                    case "likes":
                        return sortByLikes(a, b, sortDirection);
                    case "comments":
                        return sortByComments(a, b, sortDirection);
                }
            })
    }, [ideas, filter, sort, sortDirection]);

    return <IdeaList ideas={filteredIdeas} onIdeaEdit={onIdeaEdit}/>;
}

const DashboardTabs: React.FC = () => {
    const {ideas, refresh} = useIdeas();
    const {projects, refreshProjects} = useProjects();
    const newTabIndex = useRef(0);
    const ref = useRef<Map<string, IdeaCreatorRef | null>>(new Map);

    const {activeKey, setActiveKey, items, setItems, removeItem} = useContext(TabsContext);

    const [filter, setFilter] = useState<Filter>({type: "time", value: "all"});
    const [sort, setSort] = useState<SortFunction>("createdAt");
    const [sortDirection, setSortDirection] = useState<boolean>(true);

    const [api, contextHolder] = notification.useNotification();

    const onChange = (key: string) => {
        setActiveKey(key);
    };


    const edit = useCallback((id: number) => {
        const idea = ideas.find((idea) => idea.id === id)!;
        const newActiveKey = `newTab${newTabIndex.current++}`;
        setItems([...items, {
            label: idea.title,
            children: <IdeaCreator initialIdea={idea} ref={(node) => {
                ref.current.set(newActiveKey, node);
            }} onIdeaSaved={function (): void {
                refresh();
                api.open({
                    title: 'Idee gespeichert!',
                    description: 'Sie haben Ihre Idee erfolgreich verändert.',
                    duration: 3,
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
    }, [ideas, items, api, setItems, setActiveKey, refresh]);

    const editProject = useCallback((id: number) => {
        const project = projects.find((project) => project.id === id)!;
        const idea = ideas.find((idea) => idea.id === project.parentIdea)!;
        const newActiveKey = `newTab${newTabIndex.current++}`;
        setItems([...items, {
            label: idea.title,
            children: <IdeaCreator initialIdea={idea} ref={(node) => {
                ref.current.set(newActiveKey, node);
            }} onIdeaSaved={function (): void {
                refreshProjects();
                api.open({
                    title: 'Projekt gespeichert!',
                    description: 'Sie haben das Projekt erfolgreich verändert.',
                    duration: 3,
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
    }, [projects, ideas, items, api, setItems, setActiveKey, refreshProjects]);

    const combinedTabs = useMemo(() => [
        {
            label: "Ideen",
            key: "ideas-tab",
            closable: false,
            forceRender: true,
            children: <IdeaListWrapper ideas={ideas} onIdeaEdit={edit} filter={filter} sort={sort}
                                       sortDirection={sortDirection}/>,
        },
        {
            label: "Projekte",
            key: "projects-tab",
            closable: false,
            forceRender: true,
            children: <ProjectList projects={projects} ideas={ideas} onProjectEdit={editProject}/>
        },
        {
            label: "Umfragen",
            key: "polls-tab",
            closable: false,
            forceRender: true,
            children: <PollList/>
        },
        ...items
    ], [ideas, edit, filter, sort, sortDirection, projects, editProject, items])

    const add = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        setItems([...items, {
            label: 'Neue Idee',
            children: <IdeaCreator ref={(node) => {
                ref.current.set(newActiveKey, node);
            }} onIdeaSaved={function (): void {
                refresh();
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
        removeItem(activeKey);
    };

    const onEdit = (targetKey: TargetKey, action: 'add' | 'remove') => {
        if (action === 'add') {
            add();
        } else {
            removeItem(targetKey as string);
        }
    };

    type MenuItem = Required<MenuProps>["items"][number];
    const filterOptions: MenuItem[] = [
        {
            key: "category", label: "Kategorie", children: [
                {key: "Arbeitsplatz", label: "Arbeitsplatz"},
                {key: "Cafe", label: "Cafe"},
                {key: "HR", label: "HR"},
                {key: "IT", label: "IT"},
                {key: "Produkte", label: "Produkte"},
                {key: "Sonstiges", label: "Sonstiges"},
            ]
        },
        {
            key: "time", label: "Zeitraum", children: [
                {key: "day", label: "Tag"},
                {key: "week", label: "Woche"},
                {key: "month", label: "Monat"},
                {key: "all", label: "Immer"},
            ]
        },
    ];

    const sortOptions: MenuItem[] = [
        {
            key: "createdAt", label: "Erstellzeit", children: [
                {key: "createdAt_down", label: "Absteigend"},
                {key: "createdAt_up", label: "Aufsteigend"},
            ]
        },
        {
            key: "likes", label: "Likes", children: [
                {key: "likes_down", label: "Absteigend"},
                {key: "likes_up", label: "Aufsteigend"},
            ]
        },
        {
            key: "comments", label: "Kommentare", children: [
                {key: "comments_down", label: "Absteigend"},
                {key: "comments_up", label: "Aufsteigend"},
            ]
        },
    ]

    const optionsButtons = <div className={"m-2"}>
        <Dropdown trigger={["click"]} menu={{
            onClick: ({keyPath}) => {
                console.log(keyPath);
                setFilter({
                    type: keyPath[1],
                    value: keyPath[0]
                } as Filter);
            },
            items: filterOptions,
            selectedKeys: [filter.value],
        }}>
            <FilterOutlined className={"mr-2 p-2 border-2 rounded-(--border-radius) border-(--border) shadow-lg"}/>
        </Dropdown>
        <Dropdown trigger={["click"]} menu={{
            onClick: ({keyPath}) => {
                setSort(keyPath[1] as SortFunction);
                setSortDirection(keyPath[0].split("_")[1] === "down");
            },
            items: sortOptions,
            selectedKeys: [`${sort}_${sortDirection ? "down" : "up"}`],
        }}>
            <SortAscendingOutlined className={"p-2 border-2 rounded-(--border-radius) border-(--border) shadow-lg"}/>
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
                    tabBarExtraContent={{left: optionsButtons, right: saveIdeaButton}}
                    onChange={onChange}
                    activeKey={activeKey}
                    type={"editable-card"}
                    defaultActiveKey={"ideas-tab"}
                    onEdit={onEdit}
                    items={combinedTabs}
                />
            </nav>
        </div>
    );
};
export default DashboardTabs
