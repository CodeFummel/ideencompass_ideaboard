import {useCallback, useEffect, useState} from "react";

export type Idea = {
    id: number,
    title: string,
    category: string,
    tags: string[],
    body: string,
    authorId: string,
    authorName: string,
    createdAt: Date,
    files: { id: number, name: string, data: string }[],
    _count: { likes: number },
}

export type FilterFn = (ideas: Idea[]) => Idea[];

export const useIdeas = () => {
    const [ideas, setIdeas] = useState<Idea[]>([]);

    const refresh = useCallback(async () => {
        const response = await fetch("/ideas")
            .then(res => res.json());
        setIdeas(response);
    }, [setIdeas])

    useEffect(() => {
        refresh();
    }, [refresh]);

    return {ideas, refresh};
}