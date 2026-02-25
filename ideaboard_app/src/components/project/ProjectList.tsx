"use client"

import React from "react";
import {Button, Collapse, Progress} from "antd";
import {EditOutlined, RightOutlined} from "@ant-design/icons";
import {Project} from "./useProjects"
import {Idea} from "@/src/components/idea/useIdeas";
import {ProjectComponent} from "@/src/components/project/ProjectComponent";
import {formatDate} from "@/src/components/dateUtils";
import {authClient} from "@/src/utils/auth-client";


export const ProjectList: React.FC<{
    projects: Project[],
    ideas: Idea[],
    onProjectEdit: (id: number) => void
}> = ({projects, ideas, onProjectEdit}) => {

    const {
        data: session,
    } = authClient.useSession();

    const items = projects.map((project) => (
        {
            key: project.id,
            label: <div className={"flex justify-between"}>
                <div className={"flex flex-col"}>
                    <h2 className={"text-[1.2rem] font-medium"}>{ideas[project.parentIdea].title}</h2>
                    <h4 className={"font-light ml-1"}>Projektmanager: {project.managerId}, in Arbeit seit {formatDate(project.createdAt)}</h4>
                </div>
                {session?.user.role !== "user" ?
                    <div className={"flex flex-row items-center gap-2"}>
                        <Progress percent={project.progress} steps={5}/>
                        <Button onClick={() => onProjectEdit(project.id)}><EditOutlined/></Button>
                    </div>
                    :
                    <div className={"flex flex-row items-center gap-2"}>
                        <Progress percent={project.progress} steps={5}/>
                    </div>}
            </div>,
            children: <ProjectComponent {...project}/>
        }
    ));

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