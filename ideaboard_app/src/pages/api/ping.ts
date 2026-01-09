import type {NextApiRequest, NextApiResponse} from "next";
import {pool, prisma} from "@/src/util/database";


type Data = {
    message: string;
    time: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const response = await pool.query("SELECT NOW()");
    console.log(response.rows);

    const ideas = await prisma.idea.findMany();
    console.info(ideas);

    res.status(200).json({message: "Pong!", time: response.rows[0].now});
}