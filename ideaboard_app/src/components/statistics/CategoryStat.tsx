"use client"

import React from 'react'
import {ArcElement, CategoryScale, Chart as ChartJS, Legend, Title, Tooltip,} from 'chart.js';
import {Pie} from "react-chartjs-2";
import {categoryData, Period} from "@/src/components/util/statUtil";
import {useIdeas} from "@/src/components/idea/useIdeas";
import {Idea} from "@/src/components/idea/useIdeas";

ChartJS.register(
    CategoryScale,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

export const CategoryStat = ({ideas, period}: {
    period: Period;
    ideas: Idea[];
}) => {

    const data = {
        labels: [
            "Arbeitsplatz",
            "Cafe",
            "HR",
            "IT",
            "Produkte",
            "Sonstiges",
        ],
        datasets: [{
            label: "Kategorie nach Menge",
            data: categoryData(ideas, period),
            backgroundColor: [
                'rgb(255, 50, 255)',
                'rgb(50, 255, 255)',
                'rgb(255, 255, 50)',
                'rgb(255, 50, 0)',
                'rgb(100, 255, 50)',
                'rgb(0, 100, 255)'
            ],
            hoverOffset: 4
        }]
    };

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