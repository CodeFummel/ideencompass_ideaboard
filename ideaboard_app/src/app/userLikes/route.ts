import {NextRequest, NextResponse} from "next/server";
import {auth} from "@/src/utils/auth";
import {headers} from "next/headers";
import dayjs from "dayjs";
import { prisma } from "@/src/utils/database";

export async function GET(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return new Response("Session unauthorized", {status: 403});
    }

    const allUserLikes = await prisma.like.findMany({
        where: {authorId: session.user.id},
    });

    const userWeekLikes = allUserLikes.filter((like) => dayjs(like.createdAt) >= dayjs().startOf('week'));

    return NextResponse.json({userWeekLikes: userWeekLikes.length});
}