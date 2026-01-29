"use client"

import React from "react";
import {IdeaList} from "@/src/components/idea/IdeaList";
import {useIdeas} from "@/src/components/idea/useIdeas";

export const TopThreeIdeas = () => {

    const filteredIdeas = useIdeas();


    return (
        <div className={"flex-2  h-full border-2 rounded-(--border-radius) border-(--border)"}>
            <div className={"border-b-2 border-(--border) p-2"}>
                <p>Top-3 Ideen der Woche</p>
            </div>
            <div className={"flex overflow-auto"}>
                <IdeaList ideas={filteredIdeas}/>
            </div>
        </div>
    );
};