"use client"

import React, {useEffect, useState} from "react";
import {Collapse} from "antd";
import {SmileOutlined} from "@ant-design/icons";
import {formatDate} from "@/src/components/util/dateUtils";
import EmojiPicker from 'emoji-picker-react';
import {authClient} from "@/src/utils/auth-client";

export type Comment = {
    id: number;
    content: string,
    reactions: {
        emoji: string
    }[],
    authorId: string,
    authorName: string,
    createdAt: Date,
    commentedId: number,
}

const handleReaction = async (reaction: string, commentId: number, previouslyReacted: boolean) => {

    console.log("reaction", reaction);
    console.log("commentId", commentId);

    await fetch(`/reactions/[?commentId=${commentId}]`, {
        method: "DELETE",
    })

    const result = await fetch("/reactions", {
        method: "POST",
        body: JSON.stringify({
            emoji: reaction,
            commentId,
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
                                                        id,
                                                        content,
                                                        reactions,
                                                        authorId,
                                                        authorName,
                                                        createdAt,
                                                        commentedId
                                                    }) => {

    const {
        data: session,
        error,
    } = authClient.useSession()

    if (!session) {
        return (error?.statusText);
    }

    const [fullreactions, setFullreactions] = useState(undefined);

    useEffect(() => {
        fetch(`/reactions?commentId=${id}`).then((response) => {
            if (response.ok) {
                response.json().then((x) => {
                    console.info(x);
                    setFullreactions(x);
                }).catch((error) => console.log("Catch in useEffect in get reactions", error))
            } else {
                console.info(response.statusText);
            }
        })
    }, []);

    console.log(fullreactions);

    const previouslyReacted = (fullreactions) => {
        if (fullreactions.reactionId !== null){
            return !!fullreactions.reactionId.includes(session?.user.id);
        }
        else return false;
    };

    const getItems = [
        {
            key: '1',
            children: <div className={"absolute top-8 right-0 z-10"}>
                <EmojiPicker
                    onEmojiClick={(emojiObject) => handleReaction(emojiObject.emoji, id, previouslyReacted(fullreactions))}/>
            </div>,
        }
    ]

    console.log("Reactions on Comment: ", reactions);

    return (
        <div
            className={"p-(--standard-padding-in) m-1 mt-2 border-2 border-(--border) rounded-(--border-radius)"}>
            <div className={"flex flex-row justify-between border-b-2 border-(--border)"}>
                <div className={"flex flex-row"}>
                    <h2 className={"font-semibold"}>{authorName}</h2>
                    <h4 className={"font-light ml-1"}>am {formatDate(createdAt)}</h4>
                </div>
                <div className={"flex flex-row"}>
                    <span className={"mr-2 text-xl"}>{reactions.map(({emoji}) => emoji).join(" ")}</span>
                    <Collapse
                        className={"relative p-1 h-8"}
                        bordered={true}
                        expandIcon={() => <SmileOutlined className={"text-base"}/>}
                        items={getItems}
                    />
                </div>
            </div>
            <span className={"mt-4"}>{content}</span>
        </div>
    )
}
// <Button className={"padding-1"}><SmileOutlined className={"text-base"}/></Button>