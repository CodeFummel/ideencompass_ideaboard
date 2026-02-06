"use client"

import React, { useState } from 'react';
import { Radio, RadioChangeEvent } from 'antd';

export const StatFilter = () => {

    const [timeframe, setTimeframe] = useState(1);

    const onChange = (e: RadioChangeEvent) => {
        setTimeframe(e.target.value);
    };

    const data = [
        {value: 1, label: 'Heute'},
        {value: 2, label: 'Diese Woche'},
        {value: 3, label: 'Diesen Monat'},
        {value: 4, label: 'Dieses Jahr'},
        {value: 5, label: 'Alle'},
    ]

    return (
        <div className={"flex-1 h-full border-2 rounded-(--border-radius) border-(--border)"}>
            <div className={"border-b-2 border-(--border) p-2"}>
                <h2 className={"font-medium"}>Zeitspanne</h2>
            </div>
            <div className={"flex m-2"}>
                <Radio.Group
                    vertical
                    onChange={onChange}
                    value={timeframe}
                    options={data}
                />
            </div>
        </div>
    );
};