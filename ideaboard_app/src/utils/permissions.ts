import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

export const statement = {
    ...defaultStatements,
    project: ["create", "update", "delete"],
} as const;

export const ac = createAccessControl(statement);

export const user = ac.newRole({
    project: ["create"],
});

export const admin = ac.newRole({
    project: ["create", "update", "delete"],
    ...adminAc.statements,
    user: ["set-role", "list", "ban"]
});

export const lead = ac.newRole({
    project: ["create", "update", "delete"],
});