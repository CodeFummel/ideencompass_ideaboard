"use client"

import { createAuthClient } from "better-auth/react"
const { useSession } = createAuthClient()

function User() {
    const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = useSession()
    return (
        session
    )
}

export default User