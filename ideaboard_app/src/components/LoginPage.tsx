"use client"

import React, {FormEvent, useState} from "react";
import {Button, Checkbox, Form, FormProps, Input, notification, Tabs, TabsProps} from "antd";
import {useRouter} from 'next/navigation'
import {authClient} from "@/src/utils/auth-client";

type LoginFieldType = {
    email?: string;
    password?: string;
    remember?: string;
};

const LoginForm =  ({onSubmit}: {
    onSubmit:  FormProps<LoginFieldType>["onFinish"]
}) => {

    const [api, contextHolder] = notification.useNotification();

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('(Client) Login failed:', errorInfo);
        api.error({
            title: 'Email oder Passwort falsch!',
            description: 'Geben Sie Ihre richtige Email oder Ihr richtges Passwort ein.',
            duration: 3,
            showProgress: true,
            pauseOnHover: true,
            placement: "top",
        });
    };

    return (
        <div className={"flex flex-row relative"}>
            <Form
                name="loginForm"
                className={"flex-1 absolute left-1/2 -translate-x-[65%] w-full justify-center align-items-middle"}
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
                initialValues={{remember: true}}
                onFinish={onSubmit}
                onFinishFailed={onFinishFailed as any}
                autoComplete="off"
            >
                {contextHolder}
                <Form.Item<FieldType>
                    label="Email"
                    name="email"
                    rules={[{required: true, message: 'Bitte geben Sie Ihre Email ein!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item<FieldType>
                    label="Passwort"
                    name="password"
                    rules={[{required: true, message: 'Bitte geben Sie Ihr Passwort ein!'}]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
                    <Checkbox>Eingeloggt bleiben</Checkbox>
                </Form.Item>

                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Einloggen
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

type RegisterFieldType = {
    name?: string;
    email?: string;
    password?: string;
};

const RegisterForm = ({onSubmit}: {
    onSubmit:  FormProps<LoginFieldType>["onFinish"]
}) =>{

    const router = useRouter()

    async function onFinishForm(values) {
        console.info({values})

        const result = await fetch("/register", {
            method: "POST",
            body: JSON.stringify({
                name: values.name,
                email: values.email,
                password: values.password
            }),
        });
        console.info({result});
    }

    const onFinishFailed: FormProps<RegisterFieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Register failed:', errorInfo);
    };

    return (
        <div className={"flex flex-row relative"}>
            <Form
                className={"flex-1 absolute left-1/2 -translate-x-[65%] w-full justify-center align-items-middle"}
                name="registerForm"
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
                initialValues={{remember: true}}
                onFinish={onSubmit}
                onFinishFailed={onFinishFailed as any}
                autoComplete="off"
            >
                <Form.Item<RegisterFieldType>
                    label="Vor- und Nachname"
                    name="name"
                    rules={[{required: true, message: 'Bitte geben Sie Ihren vollen Namen ein!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item<RegisterFieldType>
                    label="Email"
                    name="email"
                    rules={[{required: true, message: 'Bitte geben Sie eine gültige Email ein!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item<RegisterFieldType>
                    label="Passwort"
                    name="password"
                    rules={[{required: true, message: 'Bitte geben Sie Ihr Passwort ein!'}]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Registrieren
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export function LoginPage({onLoggedIn}: {
    onLoggedIn: () => void,
}) {
    const [activeKey, setActiveKey] = useState<string>("1");

    const handleLoginSubmit: FormProps<LoginFieldType>["onFinish"] = async (fields) => {

        const {data, error} = await authClient.signIn.email({
                email: fields.email!,
                password: fields.password!,
            },
        );

        if (data) {
            onLoggedIn();
        }
    }

    const onFinish = () => {
        setActiveKey("1");
    }


    const handleRegisterSubmit: FormProps<RegisterFieldType>["onFinish"] = async (fields) => {

        console.log(fields.name);
        console.log(fields.email);
        console.log(fields.password);

        const {data, error} = await authClient.signUp.email({
                name: fields.name!,
                email: fields.email!,
                password: fields.password!,
            },
        );

        if (error) {
            console.log(error);
        }

        if (data) {
            onFinish();
            onLoggedIn();
        }
    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Einloggen',
            children: <LoginForm onSubmit={handleLoginSubmit}/>,
        },
        {
            key: '2',
            label: 'Registrieren',
            children: <RegisterForm onSubmit={handleRegisterSubmit}/>,
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
