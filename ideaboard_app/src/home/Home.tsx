"use client"

import { TopThreeIdeas} from "@/src/home/TopThreeIdeas";
import { NewIdeas} from "@/src/home/NewIdeas";
import { MyNewIdea} from "@/src/home/MyNewIdea";
import { TopIdeas} from "@/src/home/TopIdeas";
import { MyTopIdea} from "@/src/home/MyTopIdea";

export const Home = () => {
    return (
        <div className={"grid grid-cols-3 grid-rows-2 gap-4 h-dvh m-4 mt-0"}>
            <div className={"row-span-2 h-full"}>
                <TopThreeIdeas/>
            </div>
            <div className={"row-span-1 h-full"}>
                <NewIdeas/>
            </div>
            <div className={"row-span-1 h-full"}>
                <TopIdeas/>
            </div>
            <div className={"row-span-1 h-full"}>
                <MyNewIdea/>
            </div>
            <div className={"row-span-1 h-full"}>
                <MyTopIdea/>
            </div>
        </div>
    );
};