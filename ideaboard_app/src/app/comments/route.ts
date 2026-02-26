import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/src/utils/database";
import {auth} from "@/src/utils/auth";
import {headers} from "next/headers";

export async function GET(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return NextResponse.json("Session unauthorized", {status: 403});
    }

    const commentedId = request.nextUrl.searchParams.get("ideaId");

    const comments = await prisma.comment.findMany({
        where: commentedId !== null ? {commentedId: parseInt(commentedId)} : undefined,
        include: {
            reactions: {
                select: {
                    emoji: true,
                }
            }
        }
    });

    return NextResponse.json(comments);
}

export async function POST(request: Request) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return new Response("Session unauthorized", {status: 403});
    }

    const data = await request.json() as any;

    if (!data.content || !data.commentedId) {
        return new Response("Content or Idea missing", {status: 400});
    }

    const authorId = session.user.id;

    const authorName = session.user.name;

    await prisma.comment.create({
        data: {
            content: data.content,
            authorId,
            authorName,
            commentedId: data.commentedId,
        }
    });

    return NextResponse.json({ok: true, message: "Idea successfully commented"})
}

export async function DELETE(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return new Response("Session unauthorized", {status: 403});
    }

    const commentedId = request.nextUrl.searchParams.get("commentedId");
    if (!commentedId) {
        return new Response("IdeaId missing (Comment DELETE)", {status: 400});
    }

    const authorId = session.user.id;

    await prisma.comment.delete({
        where: {
            commentId: {
                commentedId: parseInt(commentedId),
                authorId: authorId,
            }
        },
    });

    return NextResponse.json({ok: true, message: "Comment deleted"})
}