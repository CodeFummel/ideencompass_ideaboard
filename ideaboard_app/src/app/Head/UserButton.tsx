"use client"

import { Image } from "antd";

import { Button } from 'antd';

export const UserButton = () => {
    return (
        <Button className="p-2 h-full text-left border-2 border-solid rounded-(--border-radius) border-(--border) hover:bg(--hover-background)">
            <Image
                width={50}
                alt="Benutzerbild"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4keE4qLaVynZj3DWaXDTfnFR3CgPiz-n_9w&s"/>
            <p>Benutzername</p>
        </Button>
    );
};