"use client"

import React from "react";
import {Progress, Tag} from "antd";
import {Idea} from "@/src/components/idea/useIdeas";
import {Project} from "@/src/components/project/useProjects";

type Idea = {
    id: number,
    category: string,
    tags: string[],
    body: string,
    files: {
        name: string,
        data: string,
    }[],
};

type Project = {
    body: string,
    managerId: string,
    parentIdea: number,
};

export const ProjectComponent: React.FC<{ projects: Project[], ideas: Idea[] }> = ({projects, ideas}) => {

    const project = projects[0]; //to fix

    return <div>
        <div className={"flex"}>
            <div className={"flex flex-1 border-b-2 border-(--border)"}>
                <div className={"flex-1 h-full p-(--standard-padding-in) border-r-2 border-(--border)"}>
                    <div>Kategorie: {<Tag>
                        <div
                            className={"pl-(--standard-padding-in) pr-(--standard-padding-in) border-2 border-(--border) rounded-(--border-radius)"}>{ideas[project.parentIdea].category}
                        </div>
                    </Tag>}
                    </div>
                </div>
                <div className={"flex-2 h-full p-(--standard-padding-in) (--border)"}>
                    <div>Tags: {ideas[project.parentIdea].tags.map((
                            tag, index
                        ) => <Tag
                            key={index}
                        >
                            <div
                                className={"pl-(--standard-padding-in) pr-(--standard-padding-in)  border-2 border-(--border) rounded-(--border-radius)"}>{tag}</div>
                        </Tag>
                    )}</div>
                </div>
            </div>
        </div>
        <div>
            <span>{project.body}</span>
        </div>
        <div>
            <Progress percent={50} steps={5}/>
        </div>
    </div>
}