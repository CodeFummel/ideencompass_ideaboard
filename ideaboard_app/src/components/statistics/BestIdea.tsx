"use client"

import React, {useMemo, useState} from "react";
import IdeaList from "@/src/components/idea/IdeaList";
import {useIdeas} from "@/src/components/idea/useIdeas";
import dayjs from "dayjs";


export const BestIdea = () => {
    const ideas = useIdeas();

    const [timeframe, setTimeframe] = useState<string>();

   // setTimeframe("week");

    const filteredIdeas = useMemo(() => {
        return ideas
            .filter(idea => dayjs().diff(idea.createdAt, "week") < 1)
            .slice(0, 1);
    }, [ideas]);

    return(
        <div className={"flex-2 overflow-auto h-full border-2 rounded-(--border-radius) border-(--border)"}>
            <div className={"border-b-2 border-(--border) p-2"}>
                <h2 className={"font-medium"}>Beste Idee</h2>
            </div>
            <div className={"flex"}>
                <IdeaList ideas={filteredIdeas}/>
            </div>
        </div>
    );
};