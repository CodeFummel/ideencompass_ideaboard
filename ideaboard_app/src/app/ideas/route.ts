import {NextResponse} from "next/server";
import {prisma} from "@/src/utils/database";

export async function GET(request: Request) {
    const ideas = await prisma.idea.findMany();
    console.info({ideas});
    return NextResponse.json(ideas)
}

export async function POST(request: Request) {
    const data = await request.json();

    const {title, category, body} = data;

    if (!title || !category || !body) {
        return new Response("Fill all blanks", {status: 400});
    }

    console.log({data})

    await prisma.idea.create({
        data: {
            title,
            category,
            body
        }
    });

    console.log("Log 2")

    return NextResponse.json({ok: true, message: "Idea successfully uploaded"})
}
