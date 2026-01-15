'use client'

import React from "react";

type Idea = {
    id: number,
    title: string,
    category: string,
    tags: string,
    body: string,
}

export const IdeaComponent: React.FC<Idea> = ({id, title, category, tags, body}) => {

    return <div className={"flex-2  h-full border-2 rounded-(--border-radius) border-(--border)"}>
        <div className={"border-b-2 border-(--border) p-2"}>
            <p>{title}</p>
        </div>
        <div>
            <div className={"flex-2  h-full border-2 rounded-(--border-radius) border-(--border)"}>
                <p>Kategorie:</p>
                <p>{category}</p>
            </div>
            <div className={"flex-2  h-full border-2 rounded-(--border-radius) border-(--border)"}>
                <p>Tags:</p>
                <p>{tags}</p>
            </div>
        </div>
        <div className={"flex-2  h-full border-2 rounded-(--border-radius) border-(--border)"}>
            <p>{body}</p>
        </div>
    </div>
}