"use client"

import { MyIdeas } from "@/src/components/home/MyIdeas";
import { MyProjects } from "@/src/components/home/MyProjects";
import {TopThreeIdeas} from "@/src/components/home/TopThreeIdeas";

export const Home = () => {
    return (
        <div className={"grid grid-cols-3 gap-4 h-dvh m-4 mt-0"}>
            <div className={"h-full"}>
                <MyIdeas/>
            </div>
            <div className={"h-full"}>
                <MyProjects/>
            </div>
            <div className={"h-full"}>
                <TopThreeIdeas/>
            </div>
        </div>
    );
};