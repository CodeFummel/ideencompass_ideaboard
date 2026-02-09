"use client"

import React from "react";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from "dayjs/plugin/utc.js";
import {Button} from "antd";
import {SmileOutlined} from "@ant-design/icons";

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
    dayjs.extend(customParseFormat);
    dayjs.extend(utc);

    const date = dayjs(createdAt, 'YYYY-MM-DD HH:mm:ssss', 'de');
    const formatDate = date.local().format("DD.MM.YYYY u[m] HH:mm").toString();

    return (
        <div
            className={"overflow-auto p-(--standard-padding-in) m-1 mt-2 border-2 border-(--border) rounded-(--border-radius)"}>
            <div className={"flex flex-row justify-between border-b-2 border-(--border)"}>
                <div className={"flex flex-row"}>
                    <h2 className={"font-semibold"}>{authorName}</h2>
                    <h4 className={"font-light ml-1"}>am {formatDate}</h4>
                </div>
                <Button className={"padding-1"}><SmileOutlined className={"text-base"}/></Button>
            </div>
            <span className={"mt-4"}>{content}</span>
            <span>{reactions}</span>
        </div>
    )
}