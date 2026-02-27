"use client"

import React from "react";
import {Button, Collapse} from "antd";
import {EditOutlined, LikeOutlined, RightOutlined} from "@ant-design/icons";
import {LikeButton} from "@/src/components/idea/LikeButton";
import {IdeaComponent} from "@/src/components/idea/IdeaComponent";
import {Idea} from "@/src/components/idea/useIdeas";
import {formatDate} from "@/src/components/dateUtils";
import {authClient} from "@/src/utils/auth-client";

const IdeaList: React.FC<{ ideas: Idea[], onIdeaEdit: (id: number) => void, editable: boolean }> = ({ideas, onIdeaEdit, editable}) => {

    const {
        data: session,
        error,
    } = authClient.useSession()

    if (!session) {
        return (error?.statusText);
    };

    const RenderEdit = ({idea, editable, onIdeaEdit}) => {
        if (editable) {
            return <Button onClick={() => onIdeaEdit(idea.id)}><EditOutlined/></Button>
        }
        return null;
    };

    const RenderLike = ({idea, editable}) => {
        if (editable) {
            return <LikeButton ideaId={idea.id}/>
        }
        return <><LikeOutlined/> {idea._count.likes}</>;
    };

    const RenderComponent = ({idea, editable}) => {
        if (session?.user.role !== "user") {
            return (<div className={"flex flex-row items-center gap-2"}>
                <div className={"flex items-center"}>
                    <RenderLike idea={idea} editable={editable}/>
                </div>
                <RenderEdit idea={idea} editable={editable} onIdeaEdit={onIdeaEdit}/>
            </div>)
        } else {
            return (<div className={"flex items-center"}>
                <RenderLike idea={idea} editable={editable}/>
            </div>)
        }
    }

    const items = ideas.map((idea) => (
        {
            key: idea.id,
            label: <div className={"flex justify-between"}>
                <div className={"flex flex-col"}>
                    <h2 className={"text-[1.2rem] font-medium"}>{idea.title}</h2>
                    <h4 className={"font-light ml-1"}>Von {idea.authorName} am {formatDate(idea.createdAt)}</h4>
                </div>
                {idea.authorId === session?.user.id ?
                    <div className={"flex flex-row items-center gap-2"}>
                    <span className={"p-(--standard-padding-in) border-(--border) rounded-(--border-radius) mr-2"}>
                        <LikeOutlined/> {idea._count.likes}
                    </span>
                        <RenderEdit idea={idea} editable={editable} onIdeaEdit={onIdeaEdit}/>
                    </div>
                    :
                    <RenderComponent idea={idea} editable={editable}/>
                }
            </div>,
            children: <IdeaComponent {...idea} editable={editable}/>
        }
    ));

    return (
        <div className={"m-2 overflow-y-auto w-full"}>
            <Collapse className={"p-0"} size={"small"} items={items} expandIcon={({isActive}) => (
                <RightOutlined
                    rotate={isActive ? 90 : 0}
                    style={{fontSize: "20px", margin: "10px 0px 0px 0px", alignSelf: "center"}}
                />
            )}
            ></Collapse>
        </div>
    )
}
export default IdeaList
