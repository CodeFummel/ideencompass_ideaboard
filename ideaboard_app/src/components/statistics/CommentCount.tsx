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

export const CommentCount = () => {

    const data = {
        labels: ['Samstag', 'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Gestern', 'Heute'],
        datasets: [{
            label: '# Anzahl von Kommentaren im Zeitraum',
            data: [5, 9, 18, 10, 2, 12, 8],
            backgroundColor: 'rgba(85, 222, 0, 0.2)',
            borderColor: 'rgba(69, 180, 0, 1)',
            borderWidth: 1
        }]
    };

    return(
        <div className={"flex-1 h-full border-2 rounded-(--border-radius) border-(--border)"}>
            <div className={"border-b-2 border-(--border) p-2"}>
                <h2 className={"font-medium"}>Anzahl Kommentare</h2>
            </div>
            <div>
                <Bar data={data} options={{scales: {y: {beginAtZero: true}}}}/>
            </div>
        </div>
    );
};