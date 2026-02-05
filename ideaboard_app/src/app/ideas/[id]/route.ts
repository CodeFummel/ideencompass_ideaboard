import { NextRequest } from "next/server";


export async function PATCH(request: NextRequest, ctx: RouteContext<"/ideas/[id]">) {
    const { id } = await ctx.params;


}