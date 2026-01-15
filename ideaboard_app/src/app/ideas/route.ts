import {NextResponse} from "next/server";
import {prisma} from "@/src/util/database";

export async function GET(request: Request) {
    const ideas = await prisma.idea.findMany();
    console.info({ideas});
    return NextResponse.json(ideas)
}
