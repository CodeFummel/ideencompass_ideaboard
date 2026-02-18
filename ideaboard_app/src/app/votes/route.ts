import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/src/utils/database";
import {auth} from "@/src/utils/auth";
import {headers} from "next/headers";

export async function PATCH(request: NextRequest, ctx: RouteContext<"/votes">) {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const authorId = session!.user.id;

    const {votedPoll, votedOption} = (await request.json());

    const vote = await prisma.vote.upsert({
        where: {
            voteId: {
                authorId: authorId,
                votedPoll: votedPoll,
            }
        },
        update: {
            votedOption,
        },
        create: {
            authorId,
            votedPoll,
            votedOption,
        }
    })

    return NextResponse.json({ok: true, message: "Successfull vote on option"})
}