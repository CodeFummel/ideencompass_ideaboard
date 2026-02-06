"use client"

import React from 'react'
import {Bar} from "react-chartjs-2";
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const LikeCount = () => {

    const data = {
        labels: ['Samstag', 'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Gestern', 'Heute'],
        datasets: [{
            label: '# Anzahl von Likes im Zeitraum',
            data: [1, 11, 9, 21, 5, 4, 13],
            backgroundColor: 'rgba(255, 50, 0, 0.2)',
            borderColor: 'rgba(200, 29, 0, 1)',
            borderWidth: 1
        }]
    };

    return(
        <div className={"flex-1 h-full border-2 rounded-(--border-radius) border-(--border)"}>
            <div className={"border-b-2 border-(--border) p-2"}>
                <h2 className={"font-medium"}>Anzahl Likes</h2>
            </div>
            <div>
                <Bar data={data} options={{scales: {y: {beginAtZero: true}}}}/>
            </div>
        </div>
    );
};