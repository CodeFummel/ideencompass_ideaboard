"use client"

import { InboxOutlined } from '@ant-design/icons';
import { Form, Input, Select, AutoComplete, Upload , message} from 'antd';
import type { SelectProps, UploadProps } from 'antd';

// Title

// Categories
const categoryOptions = [
    {value: "1",
    label: "Büro"},
    {value:"2",
    label: "Cafe"},
    {value: "3",
    label: "Teamfeier"},
    {value: "4",
    label: "Sonstiges"},
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
        const { status } = info.file;
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

export const IdeaCreator: React.FC  = () => {
    return (
        <div className="flex">
            <Form className="flex flex-1 flex-col justify-end">
                <Form.Item name={"title"} label="Titel:" rules={[{ required: true }]}>
                    <Input/>
                </Form.Item>
                <div className="flex flex-1 flex-row">
                    <Form.Item className="flex flex-1" name={"category"} label={"Kategorie:"}>
                        <Select
                            showSearch={{
                                optionFilterProp: 'label',
                                filterSort: (optionA, optionB) =>
                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase()),
                            }}
                            style={{ width:"max"}}
                            placeholder="Kategorie Auswählen"
                            options={categoryOptions}
                            />
                    </Form.Item>
                    <Form.Item className="flex flex-1" name={"tags"} label="Tags:">
                        <Select
                            mode="tags"
                            style={{ width:"max"}}//'calc(50% - 8px)' }}
                            placeholder="#tags"
                            //prefix={"#"}
                            onChange={handleChange}
                            options={tagOptions}/>
                    </Form.Item>
                </div>
                <Form.Item name={"body"} label={"Beschreibung:"}>
                    <Input.TextArea autoSize={{minRows: 10, maxRows: 10}}/>
                </Form.Item>
                <Form.Item name={"files"} label={"Dateien hochladen:"}>
                    <div className=" flex content-center  align-center border-(--border) border-2 border-inherited border-dotted rounded-(--border-radius) text-center h-30">
                        <Upload {...props} className="flex flex-1 justify-center align-center">
                            <p className="ant-upload-drag-icon flex justify-center">
                            <InboxOutlined className="flex self-center justify-center"/>
                        </p>
                        <p className="ant-upload-text align-center">Klicken oder ziehen Sie eine Datei in diesen Bereich, um sie hochzuladen.</p>
                        <p className="ant-upload-hint align-center">
                            Support für single und bulk upload.
                        </p>
                        </Upload>
                    </div>
                </Form.Item>
            </Form>
        </div>
    );
};