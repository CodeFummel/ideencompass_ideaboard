"use client"

import React from 'react'
import {CategoryStat} from "@/src/components/statistics/CategoryStat";
import {BestIdea} from "@/src/components/statistics/BestIdea";
import {CommentCount} from "@/src/components/statistics/CommentCount";
import {IdeaCount} from "@/src/components/statistics/IdeaCount";
import {LikeCount} from "@/src/components/statistics/LikeCount";
import type {Period} from "@/src/components/util/statUtil";
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
    ]

    return (
        <div className={"flex-1 xl:grid xl:grid-cols-4 xl:grid-rows-2 gap-4 h-dvh m-4 mt-0"}>
            <div className={"col-span-1 xl:h-full mb-2"}>
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
            <div className={"xl:col-span-2 xl:h-full mb-2 card"}>
                <BestIdea ideas={ideas} period={period}/>
            </div>
            <div className={"xl:row-span-2 xl:h-full mb-2 card"}>
                <CategoryStat ideas={ideas} period={period}/>
            </div>
            <div className={"xl:col-span-1 xl:h-full mb-2 card"}>
                <IdeaCount ideas={ideas} period={period}/>
            </div>
            <div className={"xl:col-span-1 xl:h-full mb-2 card"}>
                <CommentCount ideas={ideas} period={period}/>
            </div>
            <div className={"xl:col-span-1 xl:h-full mb-2 card"}>
                <LikeCount ideas={ideas} period={period}/>
            </div>
        </div>
    );
};