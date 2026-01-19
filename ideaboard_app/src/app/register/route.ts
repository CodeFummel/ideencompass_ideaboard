import {NextResponse} from "next/server";
import {prisma} from "@/src/util/database";

export async function POST(request: Request) {
    const data = await request.json();

    const {name, email, password} = data;

    if (!name || !email || !password) {
        return new Response("Fill all blanks", {status: 400});
    }

    console.log({data})

    await prisma.user.create({
        data: {
            name,
            email,
            password
        }
    });

    console.log("Register Route Log")

    return NextResponse.json({ok: true, message: "Successfully registered"})
}