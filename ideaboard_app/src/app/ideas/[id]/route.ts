import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/src/utils/database";

export async function PATCH(request: NextRequest, ctx: RouteContext<"/ideas/[id]">) {
    const {id} = await ctx.params;

    const data = await request.json();

    const {title, category, tags, body, authorId, authorName} = data;

    const files = data.files.map(file => ({
        id: file.id,
        name: file.name,
        data: file.data,
    }));

    const idea = await prisma.idea.update({
        where: {
            id: Number(id),
        },
        data: {
            title,
            category,
            tags,
            body,
            authorId,
            authorName,
            files: {
                deleteMany: {
                    id: {
                        notIn: files.filter(file => file.id !== undefined).map(file => file.id),
                    }
                },
                create: files.filter(file => file.id === undefined),
            }
        }
    });

    console.log("Updated Idea: ", idea);

    return NextResponse.json({ok: true, message: "Idea successfully updated"})
}

export async function DELETE(request: NextRequest, ctx: RouteContext<"/ideas/[id]">) {
    const {id} = await ctx.params;

    const deleteFiles = prisma.file.deleteMany({
        where: {
            ideaId: Number(id),
        },
    })

    const deleteLikes = prisma.like.deleteMany({
        where: {
            likedIdea: Number(id),
        },
    })
/*
    const deleteReactions = prisma.reaction.deleteMany({
        where: {
            commentId: {
                where:{
                    commentedId: Number(id),
                }
            }
        }
    })*/

    const deleteComments = prisma.comment.deleteMany({
        where: {
            commentedId: Number(id),
        },
    })

    const deleteIdea = prisma.idea.delete({
        where: {
            id: Number(id),
        },
    });

    await prisma.$transaction([deleteFiles, deleteLikes, deleteComments, deleteIdea])

    console.log("Deleted Idea: ", deleteIdea, "\nDeleted Files: ", deleteFiles, "\nDeleted Likes: ", deleteLikes, "\nDeleted Comments: ", deleteComments);

    return NextResponse.json({ok: true, message: "Idea successfully deleted"})
}