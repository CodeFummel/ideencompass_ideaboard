"use client"

import React from "react";

import {createAuthClient} from "better-auth/react"
import {Radio} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";

const {useSession} = createAuthClient()

type Poll = {
    title: string,
    body: string,
    closeDate: Date,
    options: {
        content: string,
    }[],
}

export const PollComponent:React.FC<Poll> = ({title, body, closeDate, options}) => {


    return (
        <div>
            <h2>{title}</h2>
            <span>{body}</span>
            <Radio></Radio>
            <span>Umfrage schliesst am {(() => {
                dayjs.extend(customParseFormat);
                dayjs.extend(utc);
                const date = dayjs(closeDate, 'YYYY-MM-DD HH:mm:ssss', 'de');
                return date.local().format("DD.MM.YYYY u[m] HH:mm");
            })()} {}</span>
        </div>
    )
}