"use client"

import React, {useState} from "react";
import {Button, Form, Input, Tabs, TabsProps} from "antd";

import { createAuthClient } from "better-auth/react"
import {authClient} from "@/src/utils/auth-client";
import {useRouter} from "next/navigation";
const { useSession } = createAuthClient()


const UserDashboard = () => {

    const router = useRouter();

    const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = useSession()

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    console.log("sign out success")
                    router.push("/");
                },
            },

        });
    }

    return (
        <div className={"flex-1 h-full p-(--standard-padding-in) border-2 border-(--border)"}>
            <p>Avatar: {session?.user.image}</p>
            <p>Benutzername: {session?.user.name}</p>
            <p>Email: {session?.user.email}</p>
            <Button onClick={handleSignOut}>Abmelden</Button>
        </div>
    )
}

type FieldType = {
    name?: string;
    email?: string;
    password?: string;
    changePassword?: string;
};

const UserSettings:React.FC = () => {

    return (
        <div className={"flex flex-row relative"}>
            <Form
                className={"flex-1 absolute left-1/2 -translate-x-[65%] w-full justify-center align-items-middle"}
                name="changeSettingsForm"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
                //initialValues={{remember: true}}
                //onFinish={onFinishForm}
                //onFinishFailed={onFinishFailed as any}
                autoComplete="off"
            >
                <Form.Item<FieldType>>
                    <p>Bild anpassen</p>
                </Form.Item>
                <Form.Item
                    label={"Namen ändern"}
                    name="name"
                >
                    <Input/>
                </Form.Item>
                <Form.Item<FieldType>
                    label={"Email ändern"}
                    name="email"
                >
                    <Input/>
                </Form.Item>
                <Form.Item<FieldType>
                    label={"Passwort ändern"}
                    name="changePassword"
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item<FieldType>
                    label={"Aktuelles Passwort"}
                    name="password"
                    rules={[{required: true, message: 'Bitte geben Sie Ihr Passwort ein!'}]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Änderungen speichern
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export const UserPage:React.FC = () => {
    const [activeKey, setActiveKey] = useState<string>("1");

    const onFinish = () => {
        setActiveKey("1");
    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Übersicht',
            children: <UserDashboard/>,
        },
        {
            key: '2',
            label: 'Einstellungen',
            children: <UserSettings onFinish={onFinish}/>,
        },

    ];

    const onTabClick = (key: string) => {
        setActiveKey(key);
    }

    return (
        <Tabs
            className={"h-full"}
            defaultActiveKey="1"
            activeKey={activeKey}
            centered
            onTabClick={onTabClick}
            items={items}/>
    )
}