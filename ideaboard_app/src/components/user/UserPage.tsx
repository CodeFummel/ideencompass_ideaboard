"use client"

import React, {useState} from "react";
import {Button, Form, Input, Tabs, TabsProps} from "antd";

import {authClient} from "@/src/utils/auth-client";
import {useRouter} from "next/navigation";

type UserChange = {
    id?: string,
    name?: string;
    email?: string;
    password?: string;
};

const UserDashboard = () => {

    const router = useRouter();

    const {
        data: session,
    } = authClient.useSession()


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
            <p>Rolle: {session?.user.role}</p>
            <Button onClick={handleSignOut}>Abmelden</Button>
            <Button href={"/"}>Dashboard</Button>
        </div>
    )
};

const UserSettings: React.FC = () => {

    const {
        data: session,
    } = authClient.useSession()

    const previousSettings = session.user;

    // Change user data
    const onFinishForm = async (values) => {

        if (values.email != previousSettings.email) {
            await authClient.changeEmail({
                newEmail: values.email,
                callbackURL: "/main",
            });
        }

        if (values.name != previousSettings.name) {
            await authClient.updateUser({
                name: values.name,
            })
        }
    };

    return (
        <div className={"flex flex-row relative"}>
            <Form
                className={"flex-1 absolute left-1/2 -translate-x-[65%] w-full justify-center align-items-middle"}
                name="changeSettingsForm"
                initialValues={previousSettings}
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
                onFinish={onFinishForm}
                autoComplete="off"
            >
                <Form.Item
                    label={"Namen ändern"}
                    name="name"
                >
                    <Input/>
                </Form.Item>
                <Form.Item<UserChange>
                    label={"Email ändern"}
                    name="email"
                >
                    <Input/>
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

/*
                <Form.Item<UserChange>
                    label={"Aktuelles Passwort"}
                    name="password"
                    rules={[{required: true, message: 'Bitte geben Sie Ihr Passwort ein!'}]}
                >
                    <Input.Password/>
                </Form.Item>
 */

export const UserPage: React.FC = () => {
    const [activeKey, setActiveKey] = useState<string>("1");

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Übersicht',
            children: <UserDashboard/>,
        },
        {
            key: '2',
            label: 'Einstellungen',
            children: <UserSettings/>,
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