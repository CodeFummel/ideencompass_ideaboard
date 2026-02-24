"use client"

import React, {useCallback, useEffect, useState} from 'react'
import {Bar} from "react-chartjs-2";
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip,} from 'chart.js';
import {countLabels, countData, Period} from "@/src/components/statistics/statUtil";;

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

type Like = {createdAt: string};

export const LikeCount= ({period}: {
    period: Period;
}) => {

    const [likes, setLikes] = useState<Like[]>([]);

    useEffect(() => {
        fetch(`/likes`).then((response) => {
            if (response.ok) {
                response.json().then((x) => {
                    console.info(x);
                    setLikes(x.likes);
                }).catch((error) => console.log("Catch in useffect in get likes", error))
            } else {
                console.info(response.statusText);
            }
        })
    }, [setLikes]);

    const data = {
        labels: countLabels(period),
        datasets: [{
            label: '# Neue Likes im Zeitraum',
            data: countData(likes, period),
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