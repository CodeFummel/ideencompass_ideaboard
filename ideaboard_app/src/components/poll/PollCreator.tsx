"use client"

import React, {useState} from "react";
import {Button, Form, Input, notification} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {createAuthClient} from "better-auth/react"

const {useSession} = createAuthClient()

export const PollCreator: React.FC = () => {

    const [api, contextHolder] = notification.useNotification();

    const {
        data: session,
        error,
    } = useSession()

    type option = { content: string };

    const [optionsList, setOptionsList] = useState<option[]>([]);

    const onFinish = async (values) => {

        setOptionsList([values.options]);
        
        const options = await Promise.all(optionsList.map(async (op) => {
            console.log("Options: ", op);
            return ({
                content: op.content,
            });
        }));

        const result = await fetch("/polls", {
            method: "POST",
            body: JSON.stringify({
                title: values.title,
                body: values.body,
                authorId: session?.session.userId,
                authorName: session?.user.name,
                options,
            }),
        });
        const route = await result.json();
        console.info({route});
        if (route.ok) {
            console.info("PollCreator successfull poll creation")
        } else {
            console.info("Server PollCreator Input Error")
        }
    };

    const onFormError = () => {
        console.error("PollCreator Input Error")
        api.error({
            title: 'Eingabefehler!',
            description: 'Füllen sie alle benötigten Felder aus, bevor sie die Umfrage abschicken.',
            duration: 5,
            showProgress: true,
            pauseOnHover: true,
            placement: "top",
        });
    }

    return (
        <div className={"overflow-auto"}>
            {contextHolder}
            <Form
                name="poll_form"
                onFinish={onFinish}
                onFinishFailed={onFormError}
                style={{maxWidth: 600}}
            >
                <Form.Item
                    name={"title"}
                    label={"Titel"}
                    rules={[
                        {
                            required: true,
                            message: "Bitte geben Sie Ihrer Umfrage einen Titel",
                        },
                    ]}>
                    <Input placeholder="Titel"/>
                </Form.Item>
                <Form.Item
                    name={"body"}
                    label={"Beschreibung"}
                    rules={[
                        {
                            required: true,
                            message: "Bitte geben Sie Ihrer Umfrage eine Beschreibung",
                        },
                    ]}>
                    <Input.TextArea
                        autoSize={{minRows: 1, maxRows: 5}}
                        placeholder="Beschreibung"
                    />
                </Form.Item>
                <Form.List
                    name="options"
                    rules={[
                        {
                            validator: async (_, options) => {
                                if (!options || options.length < 2) {
                                    return Promise.reject(new Error("Sie müssen mindestens zwei Optionen angeben"));
                                }
                            },
                        },
                    ]}
                >
                    {(fields, {add, remove}, {errors}) => (
                        <>
                            {fields.map((field, index) => (
                                <Form.Item
                                    label={index === 0 ? "Antwort 1:" : ["Antwort ", field.key]}
                                    required={false}
                                    key={field.key}
                                    name={field.name}
                                >
                                    <Form.Item
                                        {...field}
                                        validateTrigger={['onChange', 'onBlur']}
                                        rules={[
                                            {
                                                required: true,
                                                whitespace: true,
                                                message: "Bitte schreiben Sie einen Antwort oder löschen Sie dieses Feld",
                                            },
                                        ]}
                                        noStyle
                                    >
                                        <Input placeholder="Hier Antwortmöglichkeit reinschreiben"
                                               style={{width: '94%'}}/>
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button ml-2 text-xl"
                                            onClick={() => remove(field.name)}
                                        />
                                    ) : null}
                                </Form.Item>
                            ))}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => add()}
                                    style={{width: '60%'}}
                                    icon={<PlusOutlined/>}
                                >
                                    Antwort Hinzufügen
                                </Button>
                                <Form.ErrorList errors={errors}/>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}