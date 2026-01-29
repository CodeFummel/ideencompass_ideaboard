// @ts-ignore

"use client"

import React, {useEffect, useState} from "react";
import {Button, Collapse} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {LikeButton} from "@/src/components/idea/LikeButton";
import {IdeaComponent} from "@/src/components/idea/IdeaComponent";
import {createAuthClient} from "better-auth/react";
import {Idea} from "@/src/components/idea/useIdeas";


const {useSession} = createAuthClient()


export const IdeaList: React.FC<{ ideas: Idea[] }> = ({ideas}) => {

    const {
        data: session,
        error,
    } = useSession()

    if (!session) {
        return (error?.statusText);
    }

    const items = ideas.map((idea) => (
        {
            key: idea.id,
            label: <div className={"flex justify-between"}>
                <h4 className={"text-[1.2rem] font-medium"}>{idea.title}</h4>
                {idea.authorId === session?.user.id ?
                    <div className={"items-center align-middle"}>
                        <Button><EditOutlined/></Button>
                        <LikeButton ideaId={idea.id}/>
                    </div> :
                    <div className={"items-center align-middle"}>
                        <span className={"place-self-center text-[1rem] "}>Von {idea.authorName} / </span>
                        <LikeButton ideaId={idea.id}/>
                    </div>}
            </div>,
            children: <IdeaComponent {...idea}/>
        }
    ));

    return <div className={"m-2 overflow-y-auto w-full"}>
        <Collapse className={"p-0"} size={"small"} items={items}></Collapse>
    </div>;
}
