"use client"

import React from "react";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import utc from "dayjs/plugin/utc.js";

export type Comment = {
    id: number;
    content: string,
    reactions: string[],
    authorId: string,
    authorName: string,
    createdAt: Date,
    commentedId: number,
}

export const CommentComponent: React.FC<Comment> = ({content, reactions, authorId, authorName, createdAt, commentedId}) => {
    dayjs.extend(customParseFormat);
    dayjs.extend(utc);

    const date = dayjs(createdAt, 'YYYY-MM-DD HH:mm:ssss', 'de');
    const formatDate = date.local().format("DD.MM.YYYY u[m] HH:mm").toString();
    //console.log("date", date);
    //console.log("formatDate", formatDate);


    return (
        <div className={"overflow-auto p-(--standard-padding-in) m-1 mt-2 border-2 border-(--border) rounded-(--border-radius)"}>
            <div className={"flex flex-row border-b-2 border-(--border)"}>
                <h4 className={"font-semibold"}>{authorName}</h4>
                <h2 className={"font-light ml-1"}>am {formatDate}</h2>
            </div>
            <span className={"mt-4"}>{content}</span>
            <span>{reactions}</span>
        </div>
    )
}