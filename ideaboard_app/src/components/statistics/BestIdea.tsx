"use client"

import React, {useMemo} from "react";
import IdeaList from "@/src/components/idea/IdeaList";
import {useIdeas} from "@/src/components/idea/useIdeas";
import dayjs from "dayjs";
import {Period} from "@/src/components/statistics/statUtil";
import {Idea} from "@/src/components/idea/useIdeas";


export const BestIdea = ({ideas, period}: {
    period: Period;
    ideas: Idea[];
}) => {

    const filteredIdeas = useMemo(() => {
        return ideas
            .filter(idea => period === "all" ? true : dayjs(idea.createdAt).diff(dayjs(), period) === 0)
            .slice(0, 1);
    }, [ideas, period]);

    return (
        <div className={"flex-2 overflow-auto h-full border-2 rounded-(--border-radius) border-(--border)"}>
            <div className={"border-b-2 border-(--border) p-2"}>
                <h2 className={"font-medium"}>Beste Idee</h2>
            </div>
            <div className={"flex"}>
                {(filteredIdeas.length != 0) ? <IdeaList ideas={filteredIdeas} editable={false}/> :
                    <span className={"flex-1 m-6 font-light text-center"}>Keine Ideen erstellt</span>}
            </div>
        </div>
    );
};