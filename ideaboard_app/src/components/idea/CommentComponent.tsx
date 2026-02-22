"use client"

import React from "react";
import {Button} from "antd";
import {SmileOutlined} from "@ant-design/icons";
import {formatDate} from "@/src/components/dateUtils";

export type Comment = {
    id: number;
    content: string,
    reactions: string[],
    authorId: string,
    authorName: string,
    createdAt: Date,
    commentedId: number,
}

const handleReaction = async (id: number, reaction: string) => {

    const result = await fetch("/reactions/" + id, {
        method: "POST",
        body: JSON.stringify({
            reaction,
        }),
    });

    const route = await result.json();
    console.info({route});
    if (route.ok) {
        console.info("CommentComponent successful reaction")
    } else {
        console.info("Server CommentComponent Input Error")
    }
};


export const CommentComponent: React.FC<Comment> = ({
                                                        content,
                                                        reactions,
                                                        authorId,
                                                        authorName,
                                                        createdAt,
                                                        commentedId
                                                    }) => {

    return (
        <div
            className={"overflow-auto p-(--standard-padding-in) m-1 mt-2 border-2 border-(--border) rounded-(--border-radius)"}>
            <div className={"flex flex-row justify-between border-b-2 border-(--border)"}>
                <div className={"flex flex-row"}>
                    <h2 className={"font-semibold"}>{authorName}</h2>
                    <h4 className={"font-light ml-1"}>am {formatDate(createdAt)}</h4>
                </div>
                <Button className={"padding-1"}><SmileOutlined className={"text-base"}/></Button>
            </div>
            <span className={"mt-4"}>{content}</span>
            <span>{reactions}</span>
        </div>
    )
}