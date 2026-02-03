// @ts-ignore
"use client"

import React from "react";
import {Button, Collapse} from "antd";
import {EditOutlined} from "@ant-design/icons";
import {LikeButton} from "@/src/components/idea/LikeButton";
import {IdeaComponent} from "@/src/components/idea/IdeaComponent";
import {createAuthClient} from "better-auth/react";
import {Idea} from "@/src/components/idea/useIdeas";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";

const {useSession} = createAuthClient()


const IdeaList: React.FC<{ ideas: Idea[] }> = ({ideas}) => {

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
                <div>
                    <h2 className={"text-[1.2rem] font-medium"}>{idea.title}</h2>
                    <h4 className={"font-light ml-1"}>am {(() => {
                        dayjs.extend(customParseFormat);
                        dayjs.extend(utc);
                        const date = dayjs(idea.createdAt, 'YYYY-MM-DD HH:mm:ssss', 'de');
                        return date.local().format("DD.MM.YYYY u[m] HH:mm");
                    })()} {}</h4>
                </div>
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
export default IdeaList
