"use client"

import React, {useMemo} from "react";
import {IdeaList} from "@/src/components/idea/IdeaList";
import {useIdeas} from "@/src/components/idea/useIdeas";
import dayjs from "dayjs";

export const TopThreeIdeas = () => {

    const ideas = useIdeas();

    const filteredIdeas = useMemo(() => {
        return ideas
            .filter(idea => dayjs().diff(idea.createdAt, "week") < 1)
            .sort((a, b) => b._count.likes - a._count.likes)
            .slice(0, 3);
    }, [ideas]);

    // look at https://www.prisma.io/docs/orm/prisma-client/queries/aggregation-grouping-summarizing

    return (
        <div className={"flex-2  h-full border-2 rounded-(--border-radius) border-(--border)"}>
            <div className={"border-b-2 border-(--border) p-2"}>
                <h2 className={"font-medium"}>Top-3 Ideen der Woche</h2>
            </div>
            <div className={"flex overflow-auto"}>
                <IdeaList ideas={filteredIdeas}/>
            </div>
        </div>
    );
};