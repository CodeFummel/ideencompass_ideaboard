"use client"

import {DeleteOutlined, DoubleRightOutlined, InboxOutlined} from '@ant-design/icons';
import {
    Button,
    Form,
    FormInstance,
    Input,
    notification,
    Popconfirm,
    Select,
    Upload,
    UploadFile,
    UploadProps
} from 'antd';
import React, {Ref, useContext, useImperativeHandle, useRef, useState} from "react";

import {Idea} from "@/src/components/idea/useIdeas";
import {RcFile} from "antd/lib/upload";
import {TabsContext} from "@/src/components/TabsProvider";
import {authClient} from "@/src/utils/auth-client";
import {ProjectCreator} from "@/src/components/project/ProjectCreator";

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

const IdeaCreator = ({ref, onIdeaSaved, initialIdea}: {
    ref?: Ref<IdeaCreatorRef>,
    onIdeaSaved: () => void,
    initialIdea?: Idea,
}) => {
    const [previousInitialIdea, setPreviousInitialIdea] = useState<Idea | undefined>(initialIdea);
    const [fileList, setFileList] = useState<(RcFile | UploadFile)[]>(initialIdea?.files.map(({id, name}) => ({
        uid: id.toString(),
        name,
    })) ?? []);

    const formRef = useRef<FormInstance>(null)
    const newTabIndex = useRef(0);

    const {activeKey, removeItem, setActiveKey, items, setItems} = useContext(TabsContext);

    useImperativeHandle(ref, () => ({
        submit: () => {
            formRef.current?.submit()
        }
    }), [formRef]);

    const {
        data: session,
    } = authClient.useSession();

    const [api, contextHolder] = notification.useNotification();

    if (previousInitialIdea !== initialIdea) {
        setFileList(initialIdea?.files.map(({id, name}) => ({
            uid: id.toString(),
            name,
        })) ?? []);
        setPreviousInitialIdea(initialIdea);
        return null;
    }

    const isNewIdea = () => {
        return initialIdea !== undefined;
    };

    const encodeFile = async (blob: File): Promise<string> => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise(
            (resolve => reader.onloadend = () => resolve(reader.result as string))
        )
    }

    const onFinish = async (values) => {
        const files = await Promise.all(fileList.map(async (f) => {
            if (f instanceof File) {
                return ({
                    name: f.name,
                    data: (await encodeFile(f)),
                });
            } else {
                return ({
                    id: Number(f.uid),
                    name: f.name,
                })
            }
        }));

        console.log("Files: ", files);

        const result = await fetch(initialIdea ? `/ideas/${initialIdea.id}` : "/ideas", {
            method: initialIdea ? "PATCH" : "POST",
            body: JSON.stringify({
                title: values.title,
                category: values.category,
                tags: values.tags,
                body: values.body,
                authorId: session?.session.userId,
                authorName: session?.user.name,
                files,
            }),
        }).then(res => res.json());
        console.info({result});
        if (result.ok) {
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
            setFileList(fileList.filter(currentFile => currentFile.uid !== file.uid));
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);
            return false;
        },
        fileList,

    };

    const confirmConversion = () => {
        const previousKey = activeKey;
        const newActiveKey = `newTab${newTabIndex.current++}`;
        setItems(items.map(item => item.key === previousKey ? {
            label: initialIdea?.title,
            children: <ProjectCreator ref={(node) => {
                //ref.current.set(newActiveKey, node);
            }} onProjectSaved={function (): void {
                //refreshProjects();
                api.open({
                    title: 'Idee gespeichert!',
                    description: 'Sie haben Ihre Idee erfolgreich abgeschickt.',
                    duration: 5,
                    showProgress: true,
                    pauseOnHover: true,
                    placement: "top",
                });
            }} idea={initialIdea as Idea}
            />,
            key: newActiveKey,
            closable: true,
            forceRender: false,
        } : item))
        setActiveKey(newActiveKey);
    };

    const confirmDelete = async () => {
        const result = await fetch(`/ideas/${initialIdea?.id}`, {
            method: "DELETE",
        })
        console.info({result});
        if (result.ok) {
            console.info("IdeaCreator successfull idea creation")
            removeItem(activeKey);
            onIdeaSaved();
        } else {
            console.info("Server IdeaCreator Input Error")
        }
    };

    return (
        <Form className="flex-1 overflow-y-auto"
              labelCol={{span: 4}}
              onFinish={onFinish}
              onFinishFailed={onFormError}
              initialValues={initialIdea}
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
            <div className={"flex flex-row flex-1 gap-4"}>
                <Form.Item className={"m-2"}>
                    {session?.user.role != "user" ?
                        <Popconfirm title={"Idee in ein Projekt umwandeln?"}
                                    description={"Diese Aktion kann nicht rückgängig gemacht werden!\n " +
                                        "Sie werden das Projekt zusätzlich bearbeiten müssen."}
                                    okText={"Umwandeln"}
                                    cancelText={"Abbrechen"}
                                    onConfirm={confirmConversion}
                                    icon={<DoubleRightOutlined/>}
                        >
                            <Button icon={<DoubleRightOutlined/>} type={"primary"} disabled={!isNewIdea()}>
                                <span>In Projekt umwandeln</span>
                            </Button>
                        </Popconfirm>
                        :
                        <Button icon={<DoubleRightOutlined/>} type={"primary"} disabled={true}>
                            <span>In Projekt umwandeln</span>
                        </Button>
                    }
                </Form.Item>
                <Form.Item className={"m-2"}>
                    {session?.user.role != "lead" ?
                        <Popconfirm title={"Idee löschen?"}
                                    description={"Diese Aktion kann nicht rückgängig gemacht werden!"}
                                    okText={"Löschen"}
                                    cancelText={"Abbrechen"}
                                    onConfirm={confirmDelete}
                                    icon={<DeleteOutlined style={{color: "red"}}/>}
                        >
                            <Button icon={<DeleteOutlined/>} type={"primary"} danger disabled={!isNewIdea()}>
                                <span>Löschen</span>
                            </Button>
                        </Popconfirm>
                        :
                        <Button icon={<DeleteOutlined/>} type={"primary"} danger disabled={true}>
                            <span>Löschen</span>
                        </Button>
                    }
                </Form.Item>
            </div>
        </Form>
    );
};
export default IdeaCreator

function setItems(arg0: any[]) {
    throw new Error("Function not implemented.");
}
