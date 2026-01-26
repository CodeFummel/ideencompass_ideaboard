"use client"

import { createAuthClient } from "better-auth/react"
const { useSession } = createAuthClient()

export const UserInfo = () => {
    const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = useSession()

    console.log("UserInfo", session);


    return (<div className={" h-full border-2 rounded-(--border-radius) border-(--border)"}>
                <div className={"border-b-2 border-(--border) p-2"}>
                    <p>Benutzerdaten</p>
                </div>
                <div>
                    <p>Benutzername: {session?.user.name}</p>
                </div>
            </div>
    );
};