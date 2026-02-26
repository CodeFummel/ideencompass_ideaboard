"use client"

import React, {useEffect, useMemo, useState} from "react";
import type {GetProp, UploadFile, UploadProps} from 'antd';
import {Button, Form, Image, Input, Tabs, TabsProps, Upload} from "antd";

import {authClient} from "@/src/utils/auth-client";
import {useRouter} from "next/navigation";
import {PlusOutlined} from '@ant-design/icons';


type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
    });


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
            <Button onClick={handleSignOut}>Abmelden</Button>
            <Button href={"/"}>Dashboard</Button>
        </div>
    )
}

type FieldType = {
    id?: string,
    name?: string;
    email?: string;
    password?: string;
    changePassword?: string;
};

const UserSettings: React.FC = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const [users, setUsers] = useState<FieldType[]>([]);

    const {
        data: session,
    } = authClient.useSession()

    useEffect(() => {
        fetch("/users").then((response) => {
            response.json().then((u) => {
                console.info(u);
                setUsers(u);
            }).catch((error) => console.info(error))
        })
    }, []);

    const filteredUser = useMemo(() => {
        return users
            .filter(user => user.id === session?.user.id)
    }, [session?.user, users]);

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({fileList: newFileList}) =>
        setFileList(newFileList);

    const encodeFile = async (blob: File): Promise<string> => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise(
            (resolve => reader.onloadend = () => resolve(reader.result as string))
        )
    }

    const uploadProps: UploadProps = {
        onRemove: (file) => {
            setFileList(fileList.filter(currentFile => currentFile.uid !== file.uid));
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            return false;
        },
        fileList,
    };

    const onFinishForm = async (values) => {

        await authClient.updateUser({
            image: values.file,
            name: values.name,
        })

        await authClient.changeEmail({
            newEmail: values.email,
            callbackURL: "/main",
        });
    };

    const uploadButton = (
        <button style={{border: 0, background: 'none'}} type="button">
            <PlusOutlined/>
            <div style={{marginTop: 8}}>Upload</div>
        </button>
    );

    return (
        <div className={"flex flex-row relative"}>
            <Form
                className={"flex-1 absolute left-1/2 -translate-x-[65%] w-full justify-center align-items-middle"}
                name="changeSettingsForm"
                initialValues={filteredUser}
                labelCol={{span: 8}}
                wrapperCol={{span: 16}}
                style={{maxWidth: 600}}
                //initialValues={{remember: true}}
                onFinish={onFinishForm}
                //onFinishFailed={onFinishFailed as any}
                autoComplete="off"
            >
                <Form.Item<FieldType>>
                    <Upload
                        {...uploadProps}
                        listType="picture-circle"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        name={"file"}
                    >
                        {fileList.length >= 1 ? null : uploadButton}
                    </Upload>
                    {previewImage && (
                        <Image
                            styles={{root: {display: 'none'}}}
                            alt={"serverError"}
                            preview={{
                                open: previewOpen,
                                onOpenChange: (visible) => setPreviewOpen(visible),
                                afterOpenChange: (visible) => !visible && setPreviewImage(''),
                            }}
                            src={previewImage}
                        />
                    )}
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

export const UserPage: React.FC = () => {
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