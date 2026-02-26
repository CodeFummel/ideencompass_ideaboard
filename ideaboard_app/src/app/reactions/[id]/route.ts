import { auth } from "@/src/utils/auth";
import { headers } from "next/headers";
import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/src/utils/database";

export async function DELETE(request: NextRequest,  ctx: RouteContext<"/reactions/[id]">) {
    const {id} = await ctx.params;

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return new Response("Session unauthorized", {status: 403});
    }

    const commentId = request.nextUrl.searchParams.get("commentId");
    if (!commentId) {
        return new Response("CommentId missing", {status: 400});
    }

    const authorId = session.user.id;

    await prisma.reaction.delete({
        where: {
            reactionId: {
                commentId: parseInt(commentId),
                authorId: authorId,
            }
        },
    });

    return NextResponse.json({ok: true, message: "Commment successfully unreacted"})
}
