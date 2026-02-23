import {adminClient, inferAdditionalFields} from "better-auth/client/plugins";
import {createAuthClient} from "better-auth/react"
import type {auth} from "./auth";
import {ac, admin, lead, user} from "./permissions"

export const authClient = createAuthClient({
    baseURL: "http://localhost:3000",
    plugins: [inferAdditionalFields<typeof auth>(), adminClient({
        ac,
        roles: {
            admin,
            user,
            lead,
        }
    })
    ],
});