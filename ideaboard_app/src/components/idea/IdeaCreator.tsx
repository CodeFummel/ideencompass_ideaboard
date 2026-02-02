"use client"

import {InboxOutlined} from '@ant-design/icons';
import type {FormInstance, UploadFile, UploadProps} from 'antd';
import {Form, Input, notification, Select, Upload} from 'antd';
import {Ref, useImperativeHandle, useRef, useState} from "react";

import {createAuthClient} from "better-auth/react"

const {useSession} = createAuthClient()

// Categories
const categoryOptions = [
    {
        value: "Arbeitsplatz",
        label: "Arbeitsplatz"
    },
    {
        value: "Cafe",
        label: "Cafe"
    },
    {
        value: "HR",
        label: "HR"
    },
    {
        value: "IT",
        label: "IT"
    },
    {
        value: "Produkte",
        label: "Produkte"
    },
    {
        value: "Sonstiges",
        label: "Sonstiges"
    },
];
// Tags
const tagOptions = [
    {
        value: "Dringend",
        label: "Dringend"
    },
    {
        value: "Schnell erledigt",
        label: "Schnell erledigt"
    },
];

export interface IdeaCreatorRef {
    submit: () => void
}

export const IdeaCreator = ({ref, onIdeaSaved}: {
    ref?: Ref<IdeaCreatorRef>,
    onIdeaSaved: () => void,
}) => {
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const formRef = useRef<FormInstance>(null)

    useImperativeHandle(ref, () => ({
        submit: () => {
            formRef.current?.submit()
        }
    }), [formRef]);

    const {
        data: session,
        error,
    } = useSession()

    const [api, contextHolder] = notification.useNotification();

    const encodeFile = async (blob: File): Promise<string> => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise(
            (resolve => reader.onloadend = () => resolve(reader.result as string))
        )
    }

    const finish = async (values) => {
        const files = await Promise.all(fileList.map(async (f) => {
            console.log("Data: ", f);
            return ({
                name: f.name,
                data: (await encodeFile(f as any)),//.split(",")[1],
            });
        }));

        const result = await fetch("/ideas", {
            method: "POST",
            body: JSON.stringify({
                title: values.title,
                category: values.category,
                tags: values.tags,
                body: values.body,
                authorId: session?.session.userId,
                authorName: session?.user.name,
                files,
            }),
        });
        const route = await result.json();
        console.info({route});
        if (route.ok) {
            console.info("IdeaCreator successfull idea creation")
            onIdeaSaved();
        } else {
            console.info("Server IdeaCreator Input Error")
        }
    };

    const onFormError = () => {
        console.error("IdeaCreator Input Error")
        api.error({
            title: 'Eingabefehler!',
            description: 'Füllen sie alle benötigten Felder aus, bevor sie die Idee abschicken.',
            duration: 5,
            showProgress: true,
            pauseOnHover: true,
            placement: "top",
        });
    }

    // Files
    const uploadProps: UploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);

            return false;
        },
        fileList,
    };

    return (
        <Form className="flex-1 overflow-y-auto"
              labelCol={{span: 4}}
              onFinish={finish}
              onFinishFailed={onFormError}
              ref={formRef}
        >
            {contextHolder}
            <Form.Item name={"title"} label="Titel:" rules={[{required: true, message: ""}]}>
                <Input/>
            </Form.Item>
            <Form.Item label={"Kategorie:"}>
                <div className="flex flex-1 gap-4">
                    <Form.Item className="flex-3" noStyle name={"category"} rules={[{required: true, message: ""}]}>
                        <Select className={"flex-1"}
                                showSearch={{
                                    optionFilterProp: 'label',
                                    filterSort: (optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase()),
                                }}
                                placeholder="Kategorie Auswählen"
                                options={categoryOptions}
                        />
                    </Form.Item>
                    <div className={"flex flex-2 items-center gap-2"}>
                        <label>
                            Tags:
                        </label>
                        <Form.Item name={"tags"} noStyle rules={[{required: true, message: ""}]}>
                            <Select className={"flex-1"}
                                    mode="tags"
                                    placeholder="#tags"
                                    options={tagOptions}/>
                        </Form.Item>
                    </div>
                </div>
            </Form.Item>
            <Form.Item name={"body"} label={"Beschreibung:"} rules={[{required: true, message: ""}]}>
                <Input.TextArea autoSize={{minRows: 9, maxRows: 9}}/>
            </Form.Item>
            <Form.Item name={"files"} label={"Anhänge:"}>
                <div
                    className=" flex content-center align-center border-(--border) border-2 border-inherited border-dotted rounded-(--border-radius) text-center h-30">
                    <Upload.Dragger {...uploadProps} className="flex flex-1 justify-center align-center">
                        <p className="ant-upload-drag-icon flex justify-center">
                            <InboxOutlined className="flex self-center justify-center"/>
                        </p>
                        <p className="ant-upload-text align-center">Klicken oder ziehen Sie Dateien in diesen
                            Bereich</p>
                    </Upload.Dragger>
                </div>
            </Form.Item>
        </Form>
    );
};