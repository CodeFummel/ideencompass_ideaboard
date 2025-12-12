"use client"

import { Input, AutoComplete, Upload } from 'antd';

export const IdeaCreator = () => {
    return (
        <div className="flex">
            <Input>Title</Input>
            <AutoComplete>#Tags</AutoComplete>
            <Input>Text</Input>
            <Upload>Files</Upload>
        </div>
    );
};