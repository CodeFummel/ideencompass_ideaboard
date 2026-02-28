"use client"

import React, {useCallback, useEffect, useState} from "react";
import {authClient} from "@/src/utils/auth-client";
import {UserWithRole} from "better-auth/plugins";
import {Button, List, Popconfirm, Select} from "antd";
import {formatDate} from "@/src/components/util/dateUtils";
import {CheckSquareOutlined, CloseSquareOutlined} from "@ant-design/icons";


export const AdminUserManagment = () => {

    const [users, setUsers] = useState<UserWithRole[]>([]);

    const refreshUsers = useCallback(() => {
        authClient.admin.listUsers({
            query: {
                limit: 100,
                sortBy: "name",
                sortDirection: "desc",
            },
        }).then(({data, error}) => {
            if (error) {
                console.error(error.message);
                return;
            }
            console.log(data);
            setUsers(data!.users);
        });
    }, [setUsers])

    useEffect(() => {
       refreshUsers();
    }, [refreshUsers]);

    const options = [
        {value: 'user', label: 'Benutzer'},
        {value: 'lead', label: 'Projektleiter'},
        {value: 'admin', label: 'Admin'},
    ]

    const handleChange = async (value: "admin"|"lead"|"user", user: UserWithRole) => {
        console.log(`selected ${value}`);
        await authClient.admin.setRole({
            userId: user.id,
            role: value,
        });
        refreshUsers();
    };

    const banUser = async (user: UserWithRole) => {
        await authClient.admin.banUser({
            userId: user.id,
            banReason: "Verstoß gegen Richtlinien",
        });
        refreshUsers();
    }

    const unbanUser = async (user: UserWithRole) => {
        await authClient.admin.unbanUser({
            userId: user.id,
        });
        refreshUsers();
    }

    const items = (user) => (
        <div className="flex flex-row m-2 h-full border-(--border) border rounded-(--border-radius)">
            <div className={"grid grid-cols-4 grid-rows-2 w-full"}>
                <span className={"border-(--border) border p-2"}>Benutzename:</span>
                <span className={"border-(--border) border p-2"}>Email:</span>
                <span className={"border-(--border) border p-2"}>Erstelldatum:</span>
                <div className={"border-(--border) border p-2"}>
                    <span className={"mr-2"}>Rolle:</span>
                    <Select
                        defaultValue={user.role}
                        style={{width: 100}}
                        onChange={role => handleChange(role, user)}
                        options={options}
                    />
                </div>

                <span className={"border-(--border) border p-2"}>{user.name}</span>
                <span className={"border-(--border) border p-2"}>{user.email}</span>
                <span className={"border-(--border) border p-2"}>{formatDate(user.createdAt)}</span>
                {user.banned === false ? <div className={"border-(--border) border p-2"}>
                    <span className={"mr-2"}>Bannen:</span>
                    <Popconfirm title={"Benutzer bannen?"}
                                description={"Diese Aktion kann nicht rückgängig gemacht werden!"}
                                okText={"Bannen"}
                                cancelText={"Abbrechen"}
                                onConfirm={() => banUser(user)}
                                icon={<CloseSquareOutlined style={{color: "red"}}/>}
                    >
                        <Button icon={<CloseSquareOutlined />} type={"primary"} danger/>
                    </Popconfirm>
                </div> : <div className={"border-(--border) border p-2"}>
                    <span className={"mr-2"}>Entbannen:</span>
                    <Popconfirm title={"Benutzer entbannen?"}
                                description={"Diese Aktion kann rückgängig gemacht werden."}
                                okText={"Entbannen"}
                                cancelText={"Abbrechen"}
                                onConfirm={() => unbanUser(user)}
                                icon={<CheckSquareOutlined style={{color: "yellow"}}/>}
                    >
                        <Button icon={<CheckSquareOutlined />} type={"primary"}/>
                    </Popconfirm>
                </div>}
            </div>
        </div>
    )

    return (
        <div>
            <List dataSource={users} renderItem={items}></List>
        </div>
    )
}