"use client"

import React from 'react'

export const LikeCount = () => {
    return(
        <div className={"flex-1 border-2 rounded-(--border-radius) border-(--border)"}>
            <div className={"border-b-2 border-(--border) p-2"}>
                <p>Anzahl Likes</p>
            </div>
        </div>
    );
};