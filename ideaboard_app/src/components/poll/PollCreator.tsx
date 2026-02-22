"use client"

import React, {useState} from "react";
import {Button, DatePicker, DatePickerProps, Form, Input, notification} from "antd";
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

    const onOk = (value: DatePickerProps['value']) => {
        console.log('onOk: ', value);
    };

    const onFinish = async (values) => {

        const result = await fetch("/polls", {
            method: "POST",
            body: JSON.stringify({
                title: values.title,
                body: values.body,
                closeDate: values.closeDate,
                authorId: session?.session.userId,
                authorName: session?.user.name,
                options: values.options,
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
        <div className={"flex flex-col items-center overflow-auto m-2"}>
            {contextHolder}
            <Form
                className={"w-full m-2"}
                name="poll_form"
                labelCol={{span: 5}}
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
                        <div className={"flex flex-col"}>
                            {fields.map(({ key, ...restField }, index) => (
                                <Form.Item
                                    //className={"flex flex-row"}
                                    label={index === 0 ? "Antwort 1:" : ["Antwort ", key + 1]}
                                    required={false}
                                    key={key}
                                >
                                    <Form.Item
                                        className={""}
                                        {...restField}
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
                                               showCount maxLength={30}
                                               style={{width: '90%'}}/>
                                    </Form.Item>
                                    {fields.length > 1 ? (
                                        <MinusCircleOutlined
                                            className="dynamic-delete-button ml-2 text-xl"
                                            onClick={() => remove(restField.name)}
                                        />
                                    ) : null}
                                </Form.Item>
                            ))}
                            <Form.Item className={"flex flex-row justify-evenly"}>
                                <Button
                                    className="flex-1"
                                    type="dashed"
                                    onClick={() => add()}
                                    style={{width: '100%'}}
                                    icon={<PlusOutlined/>}
                                >
                                    Antwort Hinzufügen
                                </Button>
                                <Form.ErrorList errors={errors}/>
                            </Form.Item>
                        </div>
                    )}
                </Form.List>
                <Form.Item
                    name={"closeDate"}
                    label={"Enddatum"}
                    rules={[
                        {
                            required: true,
                            message: "Bitte geben Sie Ihrer Umfrage einen ein Enddatum",
                        },
                    ]}>
                    <DatePicker
                        showTime
                        onChange={(value, dateString) => {
                            console.log('Selected Time: ', value);
                            console.log('Formatted Selected Time: ', dateString);
                        }}
                        onOk={onOk}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Speichern
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}