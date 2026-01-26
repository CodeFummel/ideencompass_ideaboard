import React, {useEffect, useState} from "react";
import {LikeFilled, LikeOutlined} from "@ant-design/icons";
import {Button} from "antd";

export const LikeButton: React.FC<{ ideaId: number }> = ({ideaId}) => {
    const [isLiked, setIsLiked] = useState(false);

    const [likes, setLikes] = useState<number | null>(null);

    const fetchLikes = async () => {
        const response = await fetch(`/likes?ideaId=${ideaId}`, {
            method: "GET",
        });

        const data = await response.json();

        setLikes(data.count);
        setIsLiked(data.self);
    }

    useEffect(() => {
        fetchLikes()
    }, [])

    const handleLike = async () => {
        setIsLiked(!isLiked)

        if (!isLiked) {
            await fetch("/likes", {
                method: "POST",
                body: JSON.stringify({
                    likedIdea: ideaId,
                }),
            });
        } else {
            await fetch(`/likes?ideaId=${ideaId}`, {
                method: "DELETE",
            })
        }

        fetchLikes();
    }

    return (
        <Button
            icon={isLiked ? <LikeFilled/> : <LikeOutlined/>} className={"flex-1"}
            onClick={handleLike}>{likes}
        </Button>
    )
}