"use client"

import React from 'react'
import {Bar} from "react-chartjs-2";
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from 'chart.js';
import {countLabels, countData, Period} from "@/src/components/util/statUtil";
import {Idea} from "@/src/components/idea/useIdeas";


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const IdeaCount = ({ideas, period}: {
    period: Period;
    ideas: Idea[];
}) => {

    const data = {
        labels: countLabels(period),
        datasets: [{
            label: '# Neue Ideen im Zeitraum',
            data: countData(ideas, period),
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