"use client"

import React from 'react'
import {BestCategory} from "@/src/components/statistics/BestCategory";
import {BestIdea} from "@/src/components/statistics/BestIdea";
import {BestTags} from "@/src/components/statistics/BestTags";
import {CommentCount} from "@/src/components/statistics/CommentCount";
import {IdeaCount} from "@/src/components/statistics/IdeaCount";
import {LikeCount} from "@/src/components/statistics/LikeCount";
import {StatFilter} from "@/src/components/statistics/StatFilter";

export const Statistics: React.FC = () => {
    return (
        <div className={"flex-1 grid grid-cols-4 grid-rows-2 gap-4 h-dvh m-4 mt-0"}>
            <div className={"col-span-1 h-full"}>
                <StatFilter/>
            </div>
            <div className={"col-span-2 h-full"}>
                <BestIdea/>
            </div>
            <div className={"col-span-1 h-full"}>
                <IdeaCount/>
            </div>
            <div className={"col-span-1 h-full"}>
                <LikeCount/>
            </div>
            <div className={"col-span-1 h-full"}>
                <BestCategory/>
            </div>
            <div className={"col-span-1 h-full"}>
                <BestTags/>
            </div>
            <div className={"col-span-1 h-full"}>
                <CommentCount/>
            </div>
        </div>
    );
};