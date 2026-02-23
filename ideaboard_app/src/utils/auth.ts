import {betterAuth} from "better-auth";
import {prismaAdapter} from "better-auth/adapters/prisma";
import {admin as adminPlugin} from "better-auth/plugins";
import { ac, admin, user, lead } from "./permissions"
import {prisma} from "@/src/utils/database";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    plugins: [
        adminPlugin({
            ac,
            roles: {
                admin,
                user,
                lead,
            }
        })],
    emailAndPassword: {
        enabled: true,
    },
    user: {
        changeEmail: {
            enabled: true,
            updateEmailWithoutVerification: true
        },
        additionalFields: {
            role: {
                type: ["user", "lead", "admin"],
                required: true,
                defaultValue: "user",
                input: false,
            },
        }
    }
});