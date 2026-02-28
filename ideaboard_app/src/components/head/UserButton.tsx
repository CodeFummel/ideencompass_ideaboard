"use client"
import Link from "next/link";

import {createAuthClient} from "better-auth/react"

const {useSession} = createAuthClient()

export const UserButton = () => {

    const {
        data: session,
    } = useSession()

    return (
        <Link
            href="/account"
            className="cursor-pointer flex flex-col items-center gap-1 p-2 border border-(--border) rounded-(--border-radius)"
        >
            <div className="flex flex-row items-center gap-1">
                <span className="text-sm">Account:</span>
                <span className="text-sm">{session?.user.name}</span>
            </div>
        </Link>
    );
};