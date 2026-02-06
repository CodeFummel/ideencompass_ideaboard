"use client"

import React, {useEffect, useState} from "react";
import {Collapse} from "antd";
import {RightOutlined} from "@ant-design/icons";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import {PollComponent} from "@/src/components/poll/PollComponent";
import {createAuthClient} from "better-auth/react";

const {useSession} = createAuthClient()

type Poll = {
    id: number;
    title: string,
    body: string,
    createdAt: Date,
    closeDate: Date,
    authorName: string,
    options: {
        content: string,
    }[],
}

export const PollList: React.FC = () => {

    const [polls, setPolls] = useState<Poll[]>([]);

    useEffect(() => {
        fetch("/polls").then((response) => {
            response.json().then((p) => {
                console.info(p);
                setPolls(p);
            }).catch((error) => console.info(error))
        })
    }, []);

    const {
        data: session,
        error,
    } = useSession()

    if (!session) {
        return (error?.statusText);
    }

    const items = polls.map((poll) => (
        {
            key: poll.id,
            label: <div className={"flex justify-between"}>
                <div className={"flex flex-col"}>
                    <h2 className={"text-[1.2rem] font-medium"}>{poll.title}</h2>
                    <h4 className={"font-light ml-1"}>Von {poll.authorName} am {(() => {
                        dayjs.extend(customParseFormat);
                        dayjs.extend(utc);
                        const date = dayjs(poll.createdAt, 'YYYY-MM-DD HH:mm:ssss', 'de');
                        return date.local().format("DD.MM.YYYY u[m] HH:mm");
                    })()} {}</h4>
                </div>
            </div>,
            children: <PollComponent {...poll}/>
        }
    ));

    return <div className={"m-2 overflow-y-auto w-full"}>
        <Collapse className={"p-0"} size={"small"} items={items} expandIcon={({isActive}) => (
            <RightOutlined
                rotate={isActive ? 90 : 0}
                style={{fontSize: "20px", margin: "10px 0px 0px 0px", alignSelf: "center"}}
            />
        )}
        ></Collapse>
    </div>;
}