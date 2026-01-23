'use client'

import React from "react";
import {CommentOutlined, RightOutlined} from "@ant-design/icons";
import {Button, Form, Input, Tag} from "antd";

import {LikeButton} from "./LikeButton";

type Idea = {
    category: string,
    tags: string[],
    body: string,
    files: {
        name: string,
        data: string,
    }[],
}

export const IdeaComponent: React.FC<Idea> = ({category, tags, body, files}) => {

    return <div>
        <div className={"flex"}>
            <div className={"flex-1 h-full p-(--standard-padding-in) border-r-2 border-b-2 border-(--border)"}>
                <div>Kategorie: {<Tag>
                    <div
                        className={"pl-(--standard-padding-in) pr-(--standard-padding-in)  border-2 border-(--border) rounded-(--border-radius)"}>{category}</div>
                </Tag>
                }
                </div>
            </div>
            <div className={"flex-2 h-full p-(--standard-padding-in) border-b-2 border-(--border)"}>
                <div>Tags: {tags.map((
                        tag, index
                    ) => <Tag
                        key={index}
                    >
                        <div
                            className={"pl-(--standard-padding-in) pr-(--standard-padding-in)  border-2 border-(--border) rounded-(--border-radius)"}>{tag}</div>
                    </Tag>
                )}</div>
            </div>
        </div>
        <div className={"flex h-full p-(--standard-padding-in) border-b-2 border-(--border)"}>
            <p>{body}</p>
        </div>
        <div>
            <div>{files.map(({name, data}, index) => (
                <a key={index} href={data} download={name}
                   className={"pl-(--standard-padding-in) pr-(--standard-padding-in)"}><RightOutlined />{name}</a>
            ))}</div>
        </div>
        <div className={"flex h-full p-(--standard-padding-in) border-t-2 border-(--border)"}>
            <Button className={"flex-1"}>
                <CommentOutlined/>
            </Button>
            <div className={"flex-1"}>
                <LikeButton/>
            </div>
            <div className={"flex-24"}></div>
        </div>

        <div className={""}>
            <Form className={"flex"}>
                <Form.Item className={"flex-1"} rules={[{required: true, message: ""}]}>
                    <Input placeholder={"Kommentieren"}/>
                </Form.Item>
                <Form.Item className={"flex-1"}>
                    <Button/>
                </Form.Item>
            </Form>
        </div>
    </div>
}