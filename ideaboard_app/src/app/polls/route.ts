import {NextResponse} from "next/server";
import {prisma} from "@/src/utils/database";
import {auth} from "@/src/utils/auth";
import {headers} from "next/headers";

export async function GET(request: Request) {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        return new Response("Session unauthorized", {status: 403});
    }

    const polls = await prisma.poll.findMany({
        include: {
            options: true,
            _count: {
                select: { votes: true },
            },
            votes: true,
        },
    });

    const result = await Promise.all(polls.map(async poll => {
        return ({...poll});
    }));

    return NextResponse.json(result);
}

// Create a new Poll
export async function POST(request: Request) {
    const data = await request.json();

    const {title, body, closeDate, authorId, authorName} = data;

    if (!title || !body) {
        return new Response("Fill all blanks", {status: 400});
    }

    const options = data.options.map(content => ({content}));

    const poll = await prisma.poll.create({
        data: {
            title,
            body,
            closeDate,
            authorId,
            authorName,
            options: {
                createMany: {
                    data: options
                }
            }
        }
    });

    console.log("Poll: ", poll);

    return NextResponse.json({ok: true, message: "Poll successfully uploaded"})
}