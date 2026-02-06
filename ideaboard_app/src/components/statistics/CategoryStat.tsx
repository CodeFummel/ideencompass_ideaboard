"use client"

import React from 'react'
import {ArcElement, CategoryScale, Chart as ChartJS, Legend, Title, Tooltip,} from 'chart.js';
import {Pie} from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

const data = {
    labels: [
        'It',
        'Cafe',
        'Pausen'
    ],
    datasets: [{
        label: "Category's by amount",
        data: [300, 50, 100],
        backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
        ],
        hoverOffset: 4
    }]
};

export const CategoryStat = () => {
    return (
        <div className={"flex-1 h-full border-2 rounded-(--border-radius) border-(--border)"}>
            <div className={"border-b-2 border-(--border) p-2"}>
                <h2 className={"font-medium"}>Beliebteste Kategorien</h2>
            </div>
            <div>
                <Pie data={data}/>
            </div>
        </div>
    );
};