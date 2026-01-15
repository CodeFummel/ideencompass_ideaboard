"use client"

import { InboxOutlined } from '@ant-design/icons';
import type { FormInstance, UploadProps } from 'antd';
import { Form, Input, message, Select, Upload, notification } from 'antd';
import {Ref, useImperativeHandle, useRef, useState} from "react";

// Title

// Categories
const categoryOptions = [
    {
        value: "Ausstattung",
        label: "Ausstattung"
    },
    {
        value: "Büro",
        label: "Büro"
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
        value: "Pausen",
        label: "Pausen"
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
        values: "Schnell erledigt",
        label: "Schnell erledigt"
    }
];
// Files
const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info) {
        const {status} = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

export interface IdeaCreatorRef {
    submit: () => void
}

export const IdeaCreator = ({ref}: {
    ref?: Ref<IdeaCreatorRef>
}) => {
    const [isOK, setIsOK] = useState<null|boolean>(null);

    const formRef = useRef<FormInstance>(null)

    useImperativeHandle(ref, () => ({
        submit: () => {
            formRef.current?.submit()
        }
    }), [formRef]);

    const [api, contextHolder] = notification.useNotification();

    const finish = async (values) => {
        console.info({values})
        const result = await fetch("/idea", {
            method: "POST",
            body: JSON.stringify({
                title: values.title,
                category: values.category,
                body: values.body
            }),
        });
        const x = await result.json();
        console.info({x});
        if (x.ok){
            setIsOK(true);
            console.info("IdeaCreator successfull idea creation")
            api.open({
                title: 'Idee gespeichert!',
                description: 'Sie haben ihre Idee erfolgreich abgeschickt.',
                duration: 5,
                showProgress: true,
                pauseOnHover: true,
                placement: "top",
            });
        }
        else{
            console.error("Server IdeaCreator Input Error")
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

    return (
        <Form className="flex-1 overflow-y-auto"
              labelCol={{span: 4}}
              onFinish={finish}
              onFinishFailed={onFormError}
              ref={formRef}
        >
            {contextHolder}
            {isOK?
                (":3")
                :null}
            <Form.Item name={"title"} label="Titel:" rules={[{required: true}]}>
                <Input/>
            </Form.Item>
            <Form.Item label={"Kategorie:"} >
                <div className="flex flex-1 gap-4">
                    <Form.Item className="flex-3" noStyle name={"category"} rules={[{required: true}]}>
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
                        <Form.Item name={"tags"} noStyle rules={[{required: true}]}>
                            <Select className={"flex-1"}
                                    mode="tags"
                                    placeholder="#tags"
                                //prefix={"#"}
                                //onChange={handleChange}
                                    options={tagOptions}/>
                        </Form.Item>
                    </div>
                </div>
            </Form.Item>
            <Form.Item name={"body"} label={"Beschreibung:"} rules={[{required: true}]}>
                <Input.TextArea autoSize={{minRows: 9, maxRows: 9}}/>
            </Form.Item>
            <Form.Item name={"files"} label={"Anhänge:"}>
                <div
                    className=" flex content-center  align-center border-(--border) border-2 border-inherited border-dotted rounded-(--border-radius) text-center h-30">
                    <Upload.Dragger {...props} className="flex flex-1 justify-center align-center">
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