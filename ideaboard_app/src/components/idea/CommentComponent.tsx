"use client"

import React from "react";

export type Comment = {
    id: number;
    content: string,
    reactions: string[],
    authorId: string,
    authorName: string,
    createdAt: string,
    commentedId: number,
}

export const CommentComponent: React.FC<Comment> = ({content, reactions, authorId, authorName, createdAt, commentedId}) => {

    return (
        <div>
            <div>
                <h4>Kommentar von {authorName}</h4>
                <h2>{createdAt}</h2>
            </div>
            <span>{content}</span>
            <span>{reactions}</span>
        </div>
    )
}