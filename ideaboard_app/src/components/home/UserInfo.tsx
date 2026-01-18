"use client"

export const UserInfo = ({username}) => {
    return (<div className={" h-full border-2 rounded-(--border-radius) border-(--border)"}>
                <div className={"border-b-2 border-(--border) p-2"}>
                    <p>Benutzerdaten</p>
                </div>
                <div>
                    <p>Benutzername: {username}</p>
                </div>
            </div>
    );
};