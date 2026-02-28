"use client"

import React from "react";
import {ProjectList} from "@/src/components/project/ProjectList";
import {useIdeas} from "@/src/components/idea/useIdeas";
import {useProjects} from "@/src/components/project/useProjects";

export const MyProjects = () => {
    const {ideas} = useIdeas();
    const {projects} = useProjects();

    return (
        <div className={"flex-2 h-full overflow-auto border-2 rounded-(--border-radius) border-(--border)"}>
            <div className={"border-b-2 border-(--border) p-2"}>
                <h2 className={"font-medium"}>Meine Projekte:</h2>
            </div>
            <div className={"mr-2"}>
                <ProjectList projects={projects} ideas={ideas} editable={false}/>
            </div>
        </div>
    );
};