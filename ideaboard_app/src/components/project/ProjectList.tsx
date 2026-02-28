"use client"

import React from "react";
import {Button, Collapse, Progress} from "antd";
import {EditOutlined, RightOutlined} from "@ant-design/icons";
import {Project} from "./useProjects"
import {Idea} from "@/src/components/idea/useIdeas";
import {ProjectComponent} from "@/src/components/project/ProjectComponent";
import {formatDate} from "@/src/components/util/dateUtils";
import {authClient} from "@/src/utils/auth-client";


export const ProjectList: React.FC<{
    projects: Project[],
    ideas: Idea[],
    onProjectEdit: (id: number) => void,
    editable: boolean
}> = ({projects, ideas, onProjectEdit, editable}) => {

    const {
        data: session,
    } = authClient.useSession();

    const items = projects.map((project) => {
        const progress = (() => {
            switch (project.status) {
                case "backlog":
                    return 0;
                case "concept":
                    return 30;
                case "progress":
                    return 60;
                case "finished":
                    return 100;
            }
        })()

        return {
            key: project.id,
            label: <div className={"flex justify-between"}>
                <div className={"flex flex-col"}>
                    <h2 className={"text-[1.2rem] font-medium"}>{project.title}</h2>
                    <span className={"font-light ml-1"}>Projektmanager: {project.manager.name}</span>
                    <span className={"font-light ml-1"}>in Arbeit seit {formatDate(project.createdAt)}</span>
                </div>
                {session?.user.role !== "user" ?
                    <div className={"flex flex-row items-center gap-2"}>
                        <Progress percent={progress} steps={3}/>
                        {editable ? <Button onClick={() => onProjectEdit(project.id)}><EditOutlined/></Button> : null}
                    </div>
                    :
                    <div className={"flex flex-row items-center gap-2"}>
                        <Progress percent={progress} steps={3}/>
                    </div>}
            </div>,
            children: <ProjectComponent {...project}/>
        }
    });

    return <div className={"m-2 overflow-y-auto w-full"}>
        <Collapse className={"p-0"} size={"small"} items={items} expandIcon={({isActive}) => (
            <RightOutlined
                rotate={isActive ? 90 : 0}
                style={{fontSize: "20px", margin: "10px 0px 0px 0px", alignSelf: "center"}}
            />
        )}
        ></Collapse>
    </div>
}