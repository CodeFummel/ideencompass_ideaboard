"use client"

import { MyIdeas } from "@/src/components/home/MyIdeas";
import {TopThreeIdeas} from "@/src/components/home/TopThreeIdeas";

export const Home = () => {
    return (
        <div className={"flex flex-col lg:flex-row gap-4 h-dvh m-4 mt-0"}>
            <div className={"flex-3 h-full card p-5"}>
                <MyIdeas/>
            </div>
            <div className={"flex-2 h-full card p-5"}>
                <TopThreeIdeas/>
            </div>
        </div>
    );
};
