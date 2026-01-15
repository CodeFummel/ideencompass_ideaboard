"use client"

export const Sidebar = ({username}) => {
    return (
        <aside className="flex flex-col flex-1 justify-end gap-4 items-stretch">
            <div className={"flex-2  h-full border-2 rounded-(--border-radius) border-(--border)"}>
                <div className={"border-b-2 border-(--border) p-2"}>
                    <p>Benutzerdaten</p>
                </div>
                <div>
                    <p>Benutzername: {username}</p>
                </div>
            </div>
            <div className={"flex-2  h-full border-2 rounded-(--border-radius) border-(--border)"}>
                <div className={"border-b-2 border-(--border) p-2"}>
                    <p>Meine Projekte</p>
                </div>
                <div>
                    <p>Ich bin ein Projekt vertrau</p>
                </div>
            </div>
        </aside>
    );
};