"use client"

import React, {useCallback, useContext, useMemo, useRef, useState} from 'react';
import {Button, Dropdown, MenuProps, notification, Tabs} from 'antd';
import {FilterOutlined, SortAscendingOutlined} from "@ant-design/icons";
import IdeaCreator, {IdeaCreatorRef} from "../idea/IdeaCreator";

import IdeaList from "@/src/components/idea/IdeaList";
import {Idea, useIdeas} from "@/src/components/idea/useIdeas";
import {PollList} from "@/src/components/poll/PollList";
import {ProjectList} from "@/src/components/project/ProjectList";
import {Project, useProjects} from "@/src/components/project/useProjects";
import {TabsContext} from "@/src/components/TabsProvider";
import {sortByComments, sortByCreatedAt, sortByLikes} from "./useSort";
import dayjs from "dayjs";
import {ProjectCreator} from "@/src/components/project/ProjectCreator";

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

    return <IdeaList ideas={filteredIdeas} onIdeaEdit={onIdeaEdit} editable={true}/>;
}

const ProjectListWrapper = ({ideas, projects, onProjectEdit, filter, sort, sortDirection}: {
    ideas: Idea[]
    projects: Project[],
    onProjectEdit: (id: number) => void
    filter: Filter
    sort: SortFunction
    sortDirection: boolean
}) => {
    const filteredProjects = useMemo(() => {
        return projects
            .filter(project => {
                switch (filter.type) {
                    case "category":
                        return (project.idea.category === filter.value);
                    case "time":
                        return (filter.value === "all" ? true : dayjs(project.createdAt).diff(dayjs(), filter.value) === 0);
                }
            })
            .sort((a, b) => {
                switch (sort) {
                    case "createdAt":
                        return sortByCreatedAt(a, b, sortDirection);
                    case "likes":
                        return sortByLikes(a.idea, b.idea, sortDirection);
                    case "comments":
                        return sortByComments(a.idea, b.idea, sortDirection);
                }
            })
    }, [projects, filter, sort, sortDirection]);

    return <ProjectList projects={filteredProjects} onProjectEdit={onProjectEdit} ideas={ideas} editable={true}/>;
};

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

    // Callback for converting ideas to projects
    const onConvertIdea = useCallback((idea: Idea, previousKey: string) => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        setItems((items) => items.map(item => item.key === previousKey ? {
            label: idea.title,
            children: <ProjectCreator ref={(node) => {
                ref.current.set(newActiveKey, node);
            }} onProjectSaved={function (): void {
                refreshProjects();
                api.open({
                    title: 'Projekt gespeichert!',
                    description: 'Sie haben das Projekt erfolgreich abgeschickt.',
                    duration: 5,
                    showProgress: true,
                    pauseOnHover: true,
                    placement: "top",
                });
            }} idea={idea}
            />,
            key: newActiveKey,
            closable: true,
            forceRender: false,
        } : item))
        setActiveKey(newActiveKey);
    }, [api, refreshProjects, setActiveKey, setItems]);

    const editIdea = useCallback((id: number) => {
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
            }} onProjectConvert={() => onConvertIdea(idea, newActiveKey)}/>,
            key: newActiveKey,
            closable: true,
            forceRender: false,
        }]);
        setActiveKey(newActiveKey);
    }, [ideas, setItems, items, setActiveKey, refresh, api, onConvertIdea]);

    const editProject = useCallback((id: number) => {
        const project = projects.find((project) => project.id === id)!;
        const idea = ideas.find((idea) => idea.id === project.parentIdea)!;
        const newActiveKey = `newTab${newTabIndex.current++}`;
        setItems([...items, {
            label: project.title,
            children: <ProjectCreator initialProject={project} idea={idea} ref={(node) => {
                ref.current.set(newActiveKey, node);
            }} onProjectSaved={function (): void {
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
            children: <IdeaListWrapper ideas={ideas} onIdeaEdit={editIdea} filter={filter} sort={sort}
                                       sortDirection={sortDirection}/>,
        },
        {
            label: "Projekte",
            key: "projects-tab",
            closable: false,
            forceRender: true,
            children: <ProjectListWrapper projects={projects} ideas={ideas} onProjectEdit={editProject} filter={filter}
                                          sort={sort} sortDirection={sortDirection}/>
        },
        {
            label: "Umfragen",
            key: "polls-tab",
            closable: false,
            forceRender: true,
            children: <PollList/>
        },
        ...items
    ], [ideas, editIdea, filter, sort, sortDirection, projects, editProject, items])

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

    const saveButton = <Button type={"primary"} onClick={handleSubmit}>Speichern</Button>

    return (
        <div
            className="flex h-full text-left p-1.5 flex-col flex-2 justify-start gap-(--flex-gap) border-2 border-solid rounded-(--border-radius) border-(--border)">
            <nav className="flex">
                {contextHolder}
                <Tabs
                    className="flex flex-1"
                    tabBarExtraContent={{left: optionsButtons, right: saveButton}}
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
