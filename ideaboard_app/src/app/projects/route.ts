import {prisma} from "@/src/utils/database";
import {NextResponse} from "next/server";

export async function GET(request: Request) {
    const projects = await prisma.project.findMany({
        include: {
            manager: true,
            idea: {
                include: {
                    _count: {
                        select: {likes: true, comments: true},
                    },
                }
            },
        }
    });

    return NextResponse.json(projects);
}

// Create a new Project
export async function POST(request: Request) {
    const data = await request.json();

    const {title, body, parentIdea, managerId} = data;

    if (!title || !body) {
        return new Response("Fill all blanks", {status: 400});
    }

    const project = await prisma.project.create({
        data: {
            title,
            body,
            parentIdea,
            managerId,
        }
    });

    console.log("Project: ", project);

    return NextResponse.json({ok: true, message: "Project successfully uploaded"})
}