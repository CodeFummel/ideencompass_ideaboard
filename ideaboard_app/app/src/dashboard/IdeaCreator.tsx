"use client"

import {InboxOutlined} from '@ant-design/icons';
import type {SelectProps, UploadProps} from 'antd';
import {Form, Input, message, Select, Upload} from 'antd';

// Title

// Categories
const categoryOptions = [
    {
        value: "1",
        label: "Büro"
    },
    {
        value: "2",
        label: "Cafe"
    },
    {
        value: "3",
        label: "HR"
    },
    {
        value:"4",
        label:"Pausen"
    },
    {
        value: "5",
        label: "Sonstiges"
    },
];
// Tags
const tagOptions: SelectProps['options'] = [];

for (let i = 10; i < 36; i++) {
    tagOptions.push({
        value: i.toString(36) + i,
        label: i.toString(36) + i,
    });
}

const handleChange = (value: string[]) => {
    console.log(`selected ${value}`);
};
// Description

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

export const IdeaCreator: React.FC = () => {
    return (
        //<div className="flex">
            <Form className="flex-1 overflow-y-auto"
                  labelCol={{span: 4}}
            >
                <Form.Item name={"title"} label="Titel:" rules={[{required: false}]}>
                    <Input/>
                </Form.Item>
                <Form.Item label={"Kategorie:"}>
                    <div className="flex flex-1 gap-4">
                        <Form.Item className="flex-3" noStyle name={"category"}>
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
                            <Form.Item name={"tags"} noStyle>
                                <Select className={"flex-1"}
                                        mode="tags"
                                        placeholder="#tags"
                                    //prefix={"#"}
                                        onChange={handleChange}
                                        options={tagOptions}/>
                            </Form.Item>
                        </div>
                    </div>
                </Form.Item>
                <Form.Item name={"body"} label={"Beschreibung:"}>
                    <Input.TextArea autoSize={{minRows: 9, maxRows: 9}}/>
                </Form.Item>
                <Form.Item name={"files"} label={"Anhänge:"}>
                    <div
                        className=" flex content-center  align-center border-(--border) border-2 border-inherited border-dotted rounded-(--border-radius) text-center h-30">
                        <Upload.Dragger {...props} className="flex flex-1 justify-center align-center">
                            <p className="ant-upload-drag-icon flex justify-center">
                                <InboxOutlined className="flex self-center justify-center"/>
                            </p>
                            <p className="ant-upload-text align-center">Klicken oder ziehen Sie Dateien in diesen Bereich</p>
                        </Upload.Dragger>
                    </div>
                </Form.Item>
            </Form>
        //</div>
    );
};