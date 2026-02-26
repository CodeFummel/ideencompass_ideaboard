"use client"

import React, {Ref, useContext, useImperativeHandle, useMemo, useRef} from "react";
import {Idea} from "@/src/components/idea/useIdeas";
import {Form, FormInstance, Input, notification} from "antd";
import {TabsContext} from "@/src/components/TabsProvider";
import {authClient} from "@/src/utils/auth-client";
import IdeaList from "@/src/components/idea/IdeaList";
import dayjs from "dayjs";


export interface ProjectCreatorRef {
    submit: () => void
}

export const ProjectCreator = ({ref, idea, onProjectSaved}: {
    ref?: Ref<ProjectCreatorRef>,
    idea: Idea,
    onProjectSaved: () => void,
}) => {

    const [api, contextHolder] = notification.useNotification();

    const formRef = useRef<FormInstance>(null)

    const {activeKey, removeItem} = useContext(TabsContext);

    useImperativeHandle(ref, () => ({
        submit: () => {
            formRef.current?.submit()
        }
    }), [formRef]);

    const {
        data: session,
    } = authClient.useSession();


    const onFormError = () => {
        console.error("IdeaCreator Input Error")
        api.error({
            title: 'Eingabefehler!',
            description: 'Füllen sie alle benötigten Felder aus, bevor sie das Projekt abschicken.',
            duration: 5,
            showProgress: true,
            pauseOnHover: true,
            placement: "top",
        });
    }

    const onFinish = async (values) => {

        const result = await fetch("/projects", {
            method: "POST",
            body: JSON.stringify({
                title: values.title,
                body: values.body,
                managerId: values.managerId,
            }),
        }).then(res => res.json());
        console.info({result});
        if (result.ok) {
            console.info("IdeaCreator successfull project creation")
            onProjectSaved();
        } else {
            console.info("Server ProjectCreator Input Error")
        }
    };

    return (
        <>
            <Form className="flex-1 overflow-y-auto"
                  labelCol={{span: 4}}
                  onFinish={onFinish}
                  onFinishFailed={onFormError}
                  ref={formRef}
            >
                {contextHolder}
                <Form.Item name={"title"} label="Titel:" rules={[{required: true, message: ""}]}>
                    <Input/>
                </Form.Item>
                <Form.Item name={"body"} label={"Beschreibung:"} rules={[{required: true, message: ""}]}>
                    <Input.TextArea autoSize={{minRows: 9, maxRows: 9}}/>
                </Form.Item>
            </Form>
            <div>
                <h3>Ursprüngliche Idee: </h3>
                <IdeaList ideas={[idea]} onIdeaEdit={function(id: number): void {
                    throw new Error("Function not implemented.");
                } } />
            </div>
        </>
    )
}