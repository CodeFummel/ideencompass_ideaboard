"use client"

import React, {useEffect, useState} from 'react'
import {Bar} from "react-chartjs-2";
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from 'chart.js';
import {countData, countLabels, Period} from "@/src/components/util/statUtil";
import {Idea} from "@/src/components/idea/useIdeas";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

type Comment = {createdAt: string};

export const CommentCount = ({period}: {
    period: Period;
}) => {

    const [comments, setComments] = useState<Comment[]>([]);

    useEffect(() => {
        fetch(`/comments`).then((response) => {
            if (response.ok) {
                response.json().then((x) => {
                    console.info(x);
                    setComments(x);
                }).catch((error) => console.log("Catch in useffect in get comments", error))
            } else {
                console.info(response.statusText);
            }
        })
    }, [setComments]);

    const data = {
        labels: countLabels(period),
        datasets: [{
            label: '# Neue Kommentare im Zeitraum',
            data: countData(comments, period),
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