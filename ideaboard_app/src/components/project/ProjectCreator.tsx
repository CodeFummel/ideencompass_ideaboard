"use client"

import React, {Ref, useContext, useImperativeHandle, useRef, useState} from "react";
import {Idea} from "@/src/components/idea/useIdeas";
import {Form, FormInstance, Input, notification} from "antd";
import {TabsContext} from "@/src/components/TabsProvider";
import {authClient} from "@/src/utils/auth-client";
import IdeaList from "@/src/components/idea/IdeaList";
import {Project} from "@/src/components/project/useProjects";


export interface ProjectCreatorRef {
    submit: () => void
}

export const ProjectCreator = ({ref, idea, onProjectSaved, initialProject}: {
    ref?: Ref<ProjectCreatorRef>,
    idea: Idea,
    onProjectSaved: () => void,
    initialProject?: Project,
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

    const [previousInitialProject, setPreviousInitialProject] = useState<Project | undefined>(initialProject);

    // Handle showing initial values if a project is edited
    if (previousInitialProject !== initialProject) {
        setPreviousInitialProject(initialProject);
        return null;
    }

    const isNewProject = () => {
        return initialProject !== undefined;
    };

    const onFormError = () => {
        console.error("ProjectCreator Input Error")
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
        const result = await fetch(initialProject? `/projects/${initialProject.id}` :"/projects", {
            method: initialProject? "PATCH" : "POST",
            body: JSON.stringify({
                title: values.title,
                body: values.body,
                managerId: session?.user.id,
                parentIdea: idea.id,
            }),
        }).then(res => res.json());
        console.info({result});
        if (result.ok) {
            console.info("ProjectCreator successfull project creation")
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
                  initialValues={initialProject}
            >
                {contextHolder}
                <Form.Item name={"title"} label="Titel:" rules={[{required: true, message: ""}]}>
                    <Input placeholder={"Projekttitel"}/>
                </Form.Item>
                <Form.Item name={"body"} label={"Beschreibung:"} rules={[{required: true, message: ""}]}>
                    <Input.TextArea autoSize={{minRows: 3, maxRows: 9}} placeholder={"Beschreiben sie hier das Projekt auf Basis der Ursprungsidee"}/>
                </Form.Item>
                <div>
                    <h3>Ursprüngliche Idee: </h3>
                    <IdeaList ideas={[idea]} editable={false} onIdeaEdit={function(id: number): void {
                        throw new Error("Function not implemented.");
                    } } />
                </div>
            </Form>
        </>
    )
}