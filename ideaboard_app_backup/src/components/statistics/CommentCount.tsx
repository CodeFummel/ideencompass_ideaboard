"use client"

import React from 'react'

export const CommentCount = () => {
    return(
        <div className={"flex-1 h-full border-2 rounded-(--border-radius) border-(--border)"}>
            <div className={"border-b-2 border-(--border) p-2"}>
                <p>Anzahl Kommentare</p>
            </div>
        </div>
    );
};