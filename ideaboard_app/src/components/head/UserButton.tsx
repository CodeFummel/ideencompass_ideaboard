"use client"
import Link from "next/link";

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
        <Link
            href="/account"
            className="cursor-pointer flex flex-col items-center gap-1 p-2"
        >
            <Image
                width={40}
                alt="Benutzerbild"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4keE4qLaVynZj3DWaXDTfnFR3CgPiz-n_9w&s"
            />
            <p className="text-sm text-black dark:text-white">
                {session?.user.name}
            </p>
        </Link>


    );


};