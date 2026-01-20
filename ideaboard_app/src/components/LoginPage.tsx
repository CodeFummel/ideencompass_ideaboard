"use client"

import React, {FormEvent, useState} from "react";
import {Button, Checkbox, Form, FormProps, Input, Tabs, TabsProps} from "antd";
import {useRouter} from 'next/navigation'
import {authClient} from "@/src/utils/auth-client";


const LoginForm =  () => {

    const router = useRouter()

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {

        const formData = new FormData(event.currentTarget)
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        const {data, error} = await authClient.signIn.email({
                email,
                password,
            },
        );

        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({email, password}),
        })

        if (response.ok) {
            console.log('Login success');
            router.push('/home')
        } else {
            // Handle errors
        }
    }

    type FieldType = {
        email?: string;
        password?: string;
        remember?: string;
    };

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
        console.log('Login failed:', errorInfo);
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
                onFinish={handleSubmit}
                onFinishFailed={onFinishFailed as any}
                autoComplete="off"
            >
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

type FieldType = {
    name?: string;
    email?: string;
    password?: string;
    remember?: string;
};

const RegisterForm: React.FC<{ onFinish: () => void }> = ({onFinish}) => {
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

    const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
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
                onFinish={onFinishForm}
                onFinishFailed={onFinishFailed as any}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Vor- und Nachname"
                    name="name"
                    rules={[{required: true, message: 'Bitte geben Sie Ihren vollen Namen ein!'}]}
                >
                    <Input/>
                </Form.Item>
                <Form.Item<FieldType>
                    label="Email"
                    name="email"
                    rules={[{required: true, message: 'Bitte geben Sie eine gültige Email ein!'}]}
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
                <Form.Item label={null}>
                    <Button type="primary" htmlType="submit">
                        Registrieren
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export function LoginPage() {
    const [activeKey, setActiveKey] = useState<string>("1");

    const onFinish = () => {
        setActiveKey("1");
    }

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Einloggen',
            children: <LoginForm/>,
        },
        {
            key: '2',
            label: 'Registrieren',
            children: <RegisterForm onFinish={onFinish}/>,
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
