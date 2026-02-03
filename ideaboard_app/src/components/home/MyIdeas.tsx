"use client"

import React from "react";
import IdeaList from "@/src/components/idea/IdeaList";
import {createAuthClient} from "better-auth/react";
import {useIdeas} from "@/src/components/idea/useIdeas";

const {useSession} = createAuthClient()

export const MyIdeas:React.FC = () => {

    const ideas = useIdeas();

    const {
        data: session,
        error,
    } = useSession()

    if (!session) {
        return (error?.statusText);
    }

    const filteredIdeas =  ideas.filter((idea) => idea.authorId === session.user.id);

    return (
        <div className={"flex-2 overflow-auto h-full border-2 rounded-(--border-radius) border-(--border)"}>
            <div className={"border-b-2 border-(--border) p-2"}>
                <h2 className={"font-medium"}>Meine Ideen:</h2>
            </div>
            <div className={"flex"}>
                <IdeaList ideas={filteredIdeas}/>
            </div>
        </div>
    );
};
