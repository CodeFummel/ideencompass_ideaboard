import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/src/utils/database";


export async function PATCH(request: NextRequest, ctx: RouteContext<"/ideas/[id]">) {
    const { id } = await ctx.params;

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