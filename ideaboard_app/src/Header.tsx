"use client"

export const Header = () => {
    return (
        <header className="flex flex-row gap-(--flex-gap) items-center border-b-2 border-solid border-(--border)">
            <div className="flex-1"></div>
            <h1 className="text-[30px] font-bold">Ideenboard</h1>
            <div className="flex flex-1 justify-end">
                <button
                    className="p-[8px] m-[8px] text-left border-2 border-solid rounded-(--border-radius) border-(--border) hover:bg(--hover-background)">
                    <img src="https://via.placeholder.com/48" alt="Benutzerbild"/>
                </button>
            </div>
        </header>
    );
};