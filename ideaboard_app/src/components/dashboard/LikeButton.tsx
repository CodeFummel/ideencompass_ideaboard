import React from "react";
import { useState } from "react";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import { Button } from "antd";

export const LikeButton = () => {
    const [isLiked, setIsLiked] = useState(false);

    return (
        <Button
            icon={isLiked ? <LikeFilled/> : <LikeOutlined/>} className={"flex-1"}
            onClick={() => setIsLiked(!isLiked)}>
        </Button>
    )
}