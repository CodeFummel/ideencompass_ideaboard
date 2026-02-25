"use client"

import {UserButton} from "@/src/components/head/UserButton";

export const Header = () => {
    return (
        <header className="flex flex-row gap-4 items-center border-b-2 border-solid border-(--border) ml-4 mr-4 h-20">
            <h1 className="text-[30px] font-bold  ">Ideenboard</h1>
            <div className="flex flex-1 justify-end h-full">
               <UserButton/>
            </div>
        </header>
    );
};