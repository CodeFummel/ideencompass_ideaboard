import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/src/utils/database";
import {auth} from "@/src/utils/auth";
import {headers} from "next/headers";

export async function GET(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return new Response("Session unauthorized", {status: 403});
    }

    const ideaId = request.nextUrl.searchParams.get("ideaId");

    const likes = await prisma.like.findMany({
        where: ideaId !== null ? {likedIdea: parseInt(ideaId)} : undefined,
    });

    const self = likes.find((like) => like.authorId === session.user.id);


    return NextResponse.json({likes, self: !!self});
}

export async function POST(request: Request) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return new Response("Session unauthorized", {status: 403});
    }

    const likedIdea = (await request.json()).likedIdea;

    const authorId = session.user.id;

    const like = await prisma.like.create({
        data: {
            authorId,
            likedIdea,
        }
    });

    return NextResponse.json({ok: true, message: "Idea successfully liked"})
}

export async function DELETE(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return new Response("Session unauthorized", {status: 403});
    }

    const ideaId = request.nextUrl.searchParams.get("ideaId");
    if (!ideaId) {
        return new Response("IdeaId missing", {status: 400});
    }

    const authorId = session.user.id;

    await prisma.like.delete({
        where: {
            likeId: {
                likedIdea: parseInt(ideaId),
                authorId: authorId,
            }
        },
    });

    return NextResponse.json({ok: true, message: "Idea successfully unliked"})
}
