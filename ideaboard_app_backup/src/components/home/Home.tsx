"use client"

import { MyIdeas } from "@/src/components/home/MyIdeas";
import { MyProjects } from "@/src/components/home/MyProjects";
import {TopThreeIdeas} from "@/src/components/home/TopThreeIdeas";

export const Home = () => {
    return (
        <div className={"grid grid-cols-3 grid-rows-2 gap-4 h-dvh m-4 mt-0"}>
            <div className={"row-span-2 h-full shadow-lg"}>
                <MyIdeas/>
            </div>
            <div className={"row-span-2 h-full shadow-lg"}>
                <MyProjects/>
            </div>
            <div className={"row-span-2 h-full shadow-lg"}>
                <TopThreeIdeas/>
            </div>
        </div>
    );
};