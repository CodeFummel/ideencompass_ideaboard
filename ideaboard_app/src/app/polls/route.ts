import {NextResponse} from "next/server";
import {prisma} from "@/src/utils/database";

// Create a new Poll
export async function POST(request: Request) {
    const data = await request.json();

    const {title, body, authorId, authorName} = data;

    if (!title || !body) {
        return new Response("Fill all blanks", {status: 400});
    }

    const options = data.options.map(option => ({
        content: option.content,
    }));

    const poll = await prisma.poll.create({
        data: {
            title,
            body,
            authorId,
            authorName,
            options: {
                create: options,
            }
        }
    });

    console.log("Poll: ", poll);

    return NextResponse.json({ok: true, message: "Poll successfully uploaded"})
}