import {useCallback, useEffect, useState} from "react";
import { Idea } from "../idea/useIdeas";

export type Project = {
    id: number,
    title: string,
    body: string,
    parentIdea: number,
    status: string,
    managerId: string,
    manager: {
        name: string,
    },
    idea: Idea,
    createdAt: Date,
}

export type FilterFn = (projects: Project[]) => Project[];

export const useProjects = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    const refreshProjects = useCallback(async () => {
        const response = await fetch("/projects")
            .then(res => res.json());
        setProjects(response);
    }, [setProjects])

    useEffect(() => {
        refreshProjects();
    }, [refreshProjects]);

    return {projects, refreshProjects};
}