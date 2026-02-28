import React, {useCallback, useEffect, useState} from "react";
import {LikeFilled, LikeOutlined} from "@ant-design/icons";
import {Button, notification} from "antd";

export const LikeButton: React.FC<{ ideaId: number, userWeekLikes: number, onLiked: () => void }> = ({ideaId, userWeekLikes, onLiked}) => {
    const [isLiked, setIsLiked] = useState(false);

    const [likes, setLikes] = useState<number | null>(null);

    const [loading, setLoading] = useState<boolean>(false);

    const [api, contextHolder] = notification.useNotification();

    const fetchLikes = useCallback(async () => {
        const response = await fetch(`/likes?ideaId=${ideaId}`, {
            method: "GET",
        });

        const data = await response.json();

        setLikes(data.likes.length);
        setIsLiked(data.self);
    }, [setLikes, setIsLiked, ideaId]);

    useEffect(() => {
        fetchLikes()
    }, [fetchLikes])

    const handleLike = async () => {
        if(!loading) {
            setLoading(true);
            try {
                if (isLiked || (userWeekLikes !== null && userWeekLikes < 3)) {
                    setIsLiked(!isLiked);
                    onLiked();
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
                } else {
                    api.error({
                        title: 'Alle Likes verbraucht!',
                        description: 'Sie haben alle ihre Likes aufgebraucht! Alle Nutzer haben drei likes pro Woche.',
                        duration: 3,
                        showProgress: true,
                        pauseOnHover: true,
                        placement: "top",
                    });
                }
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <>{contextHolder}
            <Button
                icon={isLiked ? <LikeFilled/> : <LikeOutlined/>} className={"flex-1"}
                onClick={handleLike}>{likes}
            </Button>
        </>
    )
}