import React, {useCallback, useEffect, useState} from "react";
import {LikeFilled, LikeOutlined} from "@ant-design/icons";
import {Button, notification} from "antd";

export const LikeButton: React.FC<{ ideaId: number }> = ({ideaId}) => {
    const [isLiked, setIsLiked] = useState(false);

    const [likes, setLikes] = useState<number | null>(null);

    const [weekLikes, setWeekLikes] = useState<number | null>(null);

    const [loading, setLoading] = useState<boolean>(false);

    const [api, contextHolder] = notification.useNotification();

    const fetchLikes = useCallback(async () => {
        const response = await fetch(`/likes?ideaId=${ideaId}`, {
            method: "GET",
        });

        const data = await response.json();

        setLikes(data.count);
        setIsLiked(data.self);
        setWeekLikes(data.userWeekLikes);
    }, [setLikes, setIsLiked, setWeekLikes, ideaId]);

    useEffect(() => {
        fetchLikes()
    }, [fetchLikes])

    console.log(weekLikes)

    const handleLike = async () => {
        if(!loading) {
            setLoading(true);
            try {
                if (isLiked || (weekLikes !== null && weekLikes < 3)) {
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