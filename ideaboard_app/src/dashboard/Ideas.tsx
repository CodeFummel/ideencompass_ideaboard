'use client'

import React from "react";

const Ideas: React.FC = (title) => {

    return <div>
        <div className={"border-b-2 border-(--border) p-2"}>
            <p>{title}</p>
        </div>
        <div>
            <div>
                <p>Kategorie:</p>
                <p>{category}</p>
            </div>
            <div>
                <p>Tags:</p>
                <p>{tags}</p>
            </div>
        </div>
        <div>
            <p>{body}</p>
        </div>
    </div>
}