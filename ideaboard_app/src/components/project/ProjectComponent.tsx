"use client"

import React, {useMemo, useState} from "react";
import {Project, useProjects} from "@/src/components/project/useProjects";
import IdeaList from "@/src/components/idea/IdeaList";
import {useIdeas} from "@/src/components/idea/useIdeas";
import {authClient} from "@/src/utils/auth-client";
import {Select} from "antd";

type Options = "concept"|"progress"|"finished"

export const ProjectComponent: React.FC<Project> = ({body, status, parentIdea, managerId, progress}) => {

    const {
        data: session,
    } = authClient.useSession();

    const {projects, refreshProjects} = useProjects();
    const [progressValue, setProgressValue] = useState(progress);

    const {ideas} = useIdeas()

    const filteredIdeas = useMemo(() => {
        return ideas
            .filter(idea => idea.id === parentIdea)
            .slice(0, 1);
    }, [ideas, parentIdea]);

    const managerMail = session?.user.email;

    const options = [
        {value: 'concept', label: 'Konzeption'},
        {value: 'progress', label: 'Umsetzung'},
        {value: 'finished', label: 'Abgeschlossen'},
    ]

    const handleChange = async (value: "concept"|"progress"|"finished") => {
        console.log(`selected ${value}`);

        switch(value){
            case "concept":
                setProgressValue(30);
                break;
            case "progress":
                setProgressValue(60);
                break;
            case "finished":
                setProgressValue(100);
        }

        const result = await fetch("/projects/[id]", {
            method: "PATCH",
            body: JSON.stringify({
                status: value,
                progress: progressValue,
            }),
        }).then(res => res.json());
        console.info({result});
        if (result.ok) {
            console.info("IdeaCreator successfull project creation")
            //onProjectSaved();
        } else {
            console.info("Server ProjectCreator Input Error")
        }

        refreshProjects();
    };

    return <div>
        <div className={""}>
            {session?.user.role != "user" ? <div className={"flex flex-row"}>
                    <span>Projektstatus: </span>
                    <Select
                        defaultValue={status}
                        style={{width: 100}}
                        onChange={status => handleChange(status as Options)}
                        options={options}
                    />
                </div>
                :
                <span>Projektstatus: {status}</span>
            }
        </div>
        <div className={"flex"}>
            <div className={"flex flex-1 border-b-2 border-(--border)"}>
                <span>{body}</span>
                <span>Kontakt zum Projektleiter: {managerMail}</span>
            </div>
        </div>
        <div>
            <h3>Ursprüngliche Idee:</h3>
            <IdeaList ideas={filteredIdeas}/>
        </div>
    </div>
}