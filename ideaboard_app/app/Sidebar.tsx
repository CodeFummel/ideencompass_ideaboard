"use client"

export const Sidebar = ({username}) => {
    return (
        <aside className="flex flex-col flex-1 justify-end gap-(--flex-gap) items-stretch">
            <div
                className="p-[8px] m-[8px] flex flex-2 text-left border-2 border-solid rounded-(--border-radius) border-(--border)">
                <h2>Benutzername:</h2>
                <p>{username}</p>
            </div>

            <div
                className="p-[8px] m-[8px] flex flex-3 text-left border-2 border-solid rounded-(--border-radius) border-(--border)">
                <h2>Projekte:</h2>
                <p>Halloo das ist mein Projekt und so</p>
            </div>
        </aside>
    );
};