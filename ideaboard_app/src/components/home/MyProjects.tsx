"use client"

import React from "react";
import {PollCreator} from "@/src/components/poll/PollCreator";

export const MyProjects = () => {
    return (
        <div className={"flex-2 h-full overflow-auto border-2 rounded-(--border-radius) border-(--border)"}>
            <div className={"border-b-2 border-(--border) p-2"}>
                <h2 className={"font-medium"}>Meine Projekte:</h2>
            </div>
            <div>
                <PollCreator/>
            </div>
        </div>
    );
};