'use client'

import React from "react";
import { CommentOutlined } from "@ant-design/icons";
import { Form, Input, Button, Collapse } from "antd";
import type { CollapseProps } from 'antd';

import { LikeButton } from "./LikeButton";

type Idea = {
    id: number,
    title: string,
    category: string,
    tags: string,
    body: string,
}

export const IdeaComponent: React.FC<Idea> = ({id, title, category, tags, body}) => {


    const header= () => {
        return (
            <div className={"flex justify-between"}>
                <p className={"text-[1.5rem] font-medium"}>{title}</p>
                <p className={"place-self-center text-[1.2rem] "}>von User</p>
            </div>
        )
    }

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: header(),
            children: <div>
                <div className={"flex"}>
                    <div className={"flex-1 h-full p-(--standard-padding-in) border-r-2 border-b-2 border-(--border)"}>
                        <p>Kategorie: {category}</p>
                    </div>
                    <div className={"flex-2 h-full p-(--standard-padding-in) border-b-2 border-(--border)"}>
                        <p>Tags: {tags}</p>
                    </div>
                </div>
                <div className={"flex h-full p-(--standard-padding-in) border-b-2 border-(--border)"}>
                    <p>{body}</p>
                </div>
                <div>
                    <p>Here go files</p>
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
                        <Form.Item  className={"flex-1"}>
                            <Button/>
                        </Form.Item>
                    </Form>
                </div>
            </div>,
        },
    ]

    return <div className={"mb-2 border-2 rounded-(--border-radius) border-(--border)"}>
        <Collapse items={items}></Collapse>
    </div>
}