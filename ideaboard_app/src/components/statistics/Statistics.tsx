"use client"

import React from 'react'
import {CategoryStat} from "@/src/components/statistics/CategoryStat";
import {BestIdea} from "@/src/components/statistics/BestIdea";
import {CommentCount} from "@/src/components/statistics/CommentCount";
import {IdeaCount} from "@/src/components/statistics/IdeaCount";
import {LikeCount} from "@/src/components/statistics/LikeCount";
import type {Period} from "@/src/components/statistics/statUtil";
import {Radio, RadioChangeEvent} from "antd";
import {useIdeas} from "@/src/components/idea/useIdeas";
import {useState} from "react";

export const Statistics: React.FC = () => {

    const [period, setPeriod] = useState<Period>("week");

    const {ideas} = useIdeas();

    const onChange = (me: RadioChangeEvent) => {
        setPeriod(me.target.value);
    };

    const data = [
        {value: "week", label: 'Woche'},
        {value: "month", label: 'Monat'},
        {value: "year", label: 'Jahr'},
        {value: "all", label: 'Insgesamt'},
    ]

    return (
        <div className={"flex-1 grid grid-cols-4 grid-rows-2 gap-4 h-dvh m-4 mt-0"}>
            <div className={"col-span-1 h-full"}>
                <div className={"flex-1 h-full border-2 rounded-(--border-radius) border-(--border)"}>
                    <div className={"border-b-2 border-(--border) p-2"}>
                        <h2 className={"font-medium"}>Zeitspanne</h2>
                    </div>
                    <div className={"flex m-2"}>
                        <Radio.Group
                            vertical
                            onChange={onChange}
                            value={period}
                            options={data}
                        />
                    </div>
                </div>
            </div>
            <div className={"col-span-2 h-full card"}>
                <BestIdea ideas={ideas} period={period}/>
            </div>
            <div className={"row-span-2 h-full card"}>
                <CategoryStat ideas={ideas} period={period}/>
            </div>
            <div className={"col-span-1 h-full card"}>
                <IdeaCount ideas={ideas} period={period}/>
            </div>
            <div className={"col-span-1 h-full card"}>
                <CommentCount ideas={ideas} period={period}/>
            </div>
            <div className={"col-span-1 h-full card"}>
                <LikeCount ideas={ideas} period={period}/>
            </div>
        </div>
    );
};