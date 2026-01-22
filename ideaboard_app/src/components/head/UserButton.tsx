"use client"

import { Image } from "antd";

import { Button } from 'antd';
import { useRouter } from 'next/navigation'

import { createAuthClient } from "better-auth/react"
const { useSession } = createAuthClient()

export const UserButton = () => {

    const router = useRouter();

    const {
        data: session,
        isPending, //loading state
        error, //error object
        refetch //refetch the session
    } = useSession()

    const navigate = () => {
        router.push("/account");
    }

    return (
        <Button
            className="p-2 h-full text-left border-2 border-solid rounded-(--border-radius) border-(--border) hover:bg(--hover-background)"
            onClick={navigate}>
            <Image
                width={50}
                alt="Benutzerbild"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4keE4qLaVynZj3DWaXDTfnFR3CgPiz-n_9w&s"/>
            <p>{session?.user.name}</p>
        </Button>
    );
};