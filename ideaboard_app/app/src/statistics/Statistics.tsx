"use client"

import React from 'react'
import { Tabs } from 'antd';
import { BestCategory } from "@/app/src/statistics/BestCategory";
import { BestIdea } from "@/app/src/statistics/BestIdea";
import { BestTags } from "@/app/src/statistics/BestTags";
import { CommentCount } from "@/app/src/statistics/CommentCount";
import { IdeaCount } from "@/app/src/statistics/IdeaCount";
import { LikeCount } from "@/app/src/statistics/LikeCount";
import { StatFilter } from "@/app/src/statistics/StatFilter";

export const Statistics: React.FC = () => {
    return(
        <div className={"flex  flex-1 flex-col gap-4 h-dvh m-4 mt-0"}>
            <div className={"flex flex-1 flex-row gap-4"}>
                <StatFilter/>
                <BestIdea/>
                <IdeaCount/>
            </div>
            <div className={"flex flex-1 flex-row gap-4"}>
                <LikeCount/>
                <BestCategory/>
                <BestTags/>
                <CommentCount/>
            </div>
        </div>
    );
};