import {NextResponse} from "next/server";
import {prisma} from "@/src/utils/database";

export async function GET(request: Request) {
    const ideas = await prisma.idea.findMany();

    console.info({ideas});

    const result = await Promise.all(ideas.map(async idea => {
        const files = await prisma.file.findMany({where: {ideaId: idea.id}});
        console.log("File amount: ", files.length, idea.id);
        const transformFiles = files.map(file => ({
            ...file,
            data: Buffer.from(file.data).toString("utf8"),
        }));
        return ({...idea, files: transformFiles});
    }));
    return NextResponse.json(result);
}

export async function POST(request: Request) {
    const data = await request.json();

    const {title, category, tags, body, authorId, authorName} = data;

    if (!title || !category || !body || !authorId || !authorName || !data.files) {
        return new Response("Fill all blanks", {status: 400});
    }

    const files = data.files.map(file => ({
        name: file.name,
        data: file.data,
    }));

    const idea = await prisma.idea.create({
        data: {
            title,
            category,
            tags,
            body,
            authorId,
            authorName,
            files: {
                create: files,
            }
        }
    });

    console.log("Idea: ", idea);

    return NextResponse.json({ok: true, message: "Idea successfully uploaded"})
}
