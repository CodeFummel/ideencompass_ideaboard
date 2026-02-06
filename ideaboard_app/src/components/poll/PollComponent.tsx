"use client"

import React, {useState} from "react";

import {createAuthClient} from "better-auth/react"
import {Radio, RadioChangeEvent} from "antd";
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

export const PollComponent: React.FC<Poll> = ({body, closeDate, options}) => {

    const data = [{value: 1, label: "options"}]

    const [value, setValue] = useState(1);

    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
    };

    return (
        <div>
            <div>
                <span>{body}</span>
            </div>
            <div>
                <Radio.Group
                    vertical
                    onChange={onChange}
                    value={value}
                    options={data}>

                </Radio.Group>
            </div>
            <div>
                <span>
                    Umfrage schliesst am {(() => {
                    dayjs.extend(customParseFormat);
                    dayjs.extend(utc);
                    const date = dayjs(closeDate, 'YYYY-MM-DD HH:mm:ssss', 'de');
                    return date.local().format("DD.MM.YYYY u[m] HH:mm");
                })()} {}
                </span>
            </div>
        </div>
    )
}