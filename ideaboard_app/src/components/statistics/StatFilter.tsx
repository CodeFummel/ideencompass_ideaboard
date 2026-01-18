"use client"

import React from 'react';
import { Select } from 'antd';

export const StatFilter = () => {
    return(
        <div className={"flex-1 h-full border-2 rounded-(--border-radius) border-(--border)"}>
            <div className={"border-b-2 border-(--border) p-2"}>
                <p>Zeitspanne</p>
            </div>
            <div>
                <Select/>
            </div>
        </div>
    );
};