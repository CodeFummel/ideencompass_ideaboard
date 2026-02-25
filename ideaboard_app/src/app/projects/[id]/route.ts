import {NextRequest, NextResponse} from "next/server";
import {prisma} from "@/src/utils/database";

export async function PATCH(request: NextRequest, ctx: RouteContext<"/projects/[id]">) {
    const {id} = await ctx.params;

    const data = await request.json();

    const {status} = data;

    const project = await prisma.project.update({
        where: {
            id: Number(id),
        },
        data: {
            status,
        }
    });

    console.log("Updated Project status: ", project);

    return NextResponse.json({ok: true, message: "Project successfully updated"})
}
