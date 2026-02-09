import {NextResponse} from "next/server";
import {prisma} from "@/src/utils/database";

export async function GET(request: Request) {
    const polls = await prisma.poll.findMany();

    const result = await Promise.all(polls.map(async poll => {
        return ({...poll});
    }));

    return NextResponse.json(result);
}

// Create a new Poll
export async function POST(request: Request) {
    const data = await request.json();

    const {title, body, closeDate, authorId, authorName} = data;

    console.log("data: ", {data});

    if (!title || !body) {
        return new Response("Fill all blanks", {status: 400});
    }

    const options = data.options.map(option => ({
        content: option.content,
    }));

    console.log("Options in Route: " ,options);

    const poll = await prisma.poll.create({
        data: {
            title,
            body,
            closeDate,
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