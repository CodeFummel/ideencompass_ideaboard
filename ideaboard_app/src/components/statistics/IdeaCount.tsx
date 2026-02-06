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

export const IdeaCount = () => {

    const data = {
        labels: ['Samstag', 'Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Gestern', 'Heute'],
        datasets: [{
            label: '# Anzahl von Ideen im Zeitraum',
            data: [12, 19, 3, 5, 2, 3, 15],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };

    return (
        <div className={"flex-1 h-full border-2 rounded-(--border-radius) border-(--border)"}>
            <div className={"border-b-2 border-(--border) p-2"}>
                <h2 className={"font-medium"}>Anzahl Ideen</h2>
            </div>
            <div>
                <Bar data={data} options={{scales: {y: {beginAtZero: true}}}}/>
            </div>
        </div>
    );

}