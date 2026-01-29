import {useEffect, useState} from "react";

export type Idea = {
    id: number,
    title: string,
    category: string,
    tags: string[],
    body: string,
    authorId: string,
    authorName: string,
    files: { name: string, data: string }[],
}

export type FilterFn = (ideas: Idea[]) => Idea[];

export const useIdeas = () => {
    const [ideas, setIdeas] = useState<Idea[]>([]);

    useEffect(() => {
        fetch("/ideas").then((response) => {
            response.json().then((x) => {
                console.info(x);
                setIdeas(x);
            }).catch((error) => console.info(error))
        })
    }, []);

    return ideas;
}