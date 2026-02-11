import {useCallback, useEffect, useState} from "react";

export type Project = {
    id: number,
    body: string,
    parentIdea: number,
    progress: number,
    managerId: string,
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