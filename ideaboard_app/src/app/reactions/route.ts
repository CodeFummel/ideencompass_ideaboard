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

    const reactionId = request.nextUrl.searchParams.get("reactionId");

    const reactions = await prisma.reaction.findMany({
        where: reactionId !== null ? {commentId: parseInt(reactionId)} : undefined,
    });

    const self = reactions.find((reaction) => reaction.authorId === session.user.id);

    return NextResponse.json({reactions, self: !!self, reactionId});
}

export async function POST(request: Request) {

    const data = await request.json();

    const {emoji, commentId} = data;

    console.log("Emoji: ", emoji)

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return new Response("Session unauthorized", {status: 403});
    }

    const authorId = session.user.id;

    console.log("CommentId: ", commentId);

    const reaction = await prisma.reaction.create({
        data: {
            emoji,
            authorId,
            commentId,
        }
    });

    return NextResponse.json({ok: true, message: "Comment successfully reacted to"})
}