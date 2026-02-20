'use client'

import React, {useEffect, useState} from "react";
import {RightOutlined, SendOutlined} from "@ant-design/icons";
import {Button, Form, Input, notification, Tag} from "antd";
import {Comment, CommentComponent} from "@/src/components/idea/CommentComponent";

import {createAuthClient} from "better-auth/react"
import {useIdeas} from "@/src/components/idea/useIdeas";

const {useSession} = createAuthClient()

type Idea = {
    id: number;
    category: string,
    tags: string[],
    body: string,
    files: {
        name: string,
        data: string,
    }[],
}

export const IdeaComponent: React.FC<Idea> = ({id, category, tags, body, files}) => {

    const [comments, setComments] = useState<Comment[]>([]);

    const {ideas, refresh} = useIdeas();

    useEffect(() => {
        fetch(`/comments?ideaId=${id}`).then((response) => {
            if (response.ok) {
                response.json().then((x) => {
                    console.info(x);
                    setComments(x);
                }).catch((error) => console.log("Catch in useffect in get comments", error))
            } else {
                console.info(response.statusText);
            }
        })
    }, []);

    const [api, contextHolder] = notification.useNotification();

    const {
        data: session,
        error,
    } = useSession()

    if (!session) {
        return (error?.statusText);
    }

    const handleSubmit = async (values) => {
        console.info({values})

        const response = await fetch("/comments", {
            method: "POST",
            body: JSON.stringify({
                commentedId: id,
                content: values.content,
            }),
        });

        if (!response.ok) {
            console.log("Server returned error in IdeaComponent handleSubmit: ", response.statusText);
            return;
        }

        try {
            const x = await response.json();

            console.info({x});
            if (x.ok) {
                console.info("Succesfull Comment 'POST'")
                api.open({
                    title: 'Idee kommentiert!',
                    description: 'Ihr Kommentar wurde erfolgreich abgeschickt.',
                    duration: 3,
                    showProgress: true,
                    pauseOnHover: true,
                    placement: "top",
                });
                await refresh();
            } else {
                console.info("Server IdeaCreator Input Error")
            }
        } catch (error) {
            console.log("catch error in handleSubmit in IdeaComponent: ", error);
        }
    }

    const onFormError = () => {
        console.error("Comment Input Error")
        api.error({
            title: 'Eingabefehler!',
            description: 'Schreiben Sie etwas, bevor Sie kommentieren',
            duration: 3,
            showProgress: true,
            pauseOnHover: true,
            placement: "top",
        });
    }

    return <div>
        <div className={"flex"}>
            {contextHolder}
            <div className={"flex flex-1 border-b-2 border-(--border)"}>
                <div className={"flex-1 h-full p-(--standard-padding-in) border-r-2 border-(--border)"}>
                    <div>Kategorie: {<Tag>
                        <div
                            className={"pl-(--standard-padding-in) pr-(--standard-padding-in) border-2 border-(--border) rounded-(--border-radius)"}>{category}
                        </div>
                    </Tag>}
                    </div>
                </div>
                <div className={"flex-2 h-full p-(--standard-padding-in) (--border)"}>
                    <div>Tags: {tags.map((
                            tag, index
                        ) => <Tag
                            key={index}
                        >
                            <div
                                className={"pl-(--standard-padding-in) pr-(--standard-padding-in) border-2 border-(--border) rounded-(--border-radius)"}>{tag}</div>
                        </Tag>
                    )}</div>
                </div>
            </div>
        </div>
        <div className={"flex flex-row h-full p-(--standard-padding-in) border-b-2 border-(--border)"}>
            <h4 className={"font-medium"}>Beschreibung: </h4>
            <span>{body}</span>
        </div>
        <div>
            {files.length != 0 ?
                <div>{files.map(({name, data}, index) => (
                    <a key={index} href={data} download={name}
                       className={"pl-(--standard-padding-in) pr-(--standard-padding-in)"}><RightOutlined/>{name}</a>
            ))}</div> : null}
        </div>
        <div className={"flex flex-row p-(--standard-padding-in) border-t-2 border-(--border)"}>

            <Form className={"flex w-full"}
                  onFinish={handleSubmit}
                  onFinishFailed={onFormError}
            >
                <div className="flex flex-row gap-2 items-center w-full">
                    <Form.Item noStyle
                               className={"w-full"}
                               name={"content"}
                               rules={[{required: true, message: ""}]}>
                        <Input showCount maxLength={200} placeholder={"Kommentieren"}/>
                    </Form.Item>
                    <Form.Item noStyle className={""}>
                        <Button type={"primary"} htmlType="submit"><SendOutlined/></Button>
                    </Form.Item>
                </div>
            </Form>
        </div>
        <div>
            {comments.map(comment => <CommentComponent key={comment.id} {...comment}/>)}
        </div>
    </div>
}
