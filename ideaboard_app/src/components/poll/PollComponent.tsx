"use client"

import React, {useState} from "react";
import {Radio, RadioChangeEvent} from "antd";
import {Bar} from "react-chartjs-2";
import {formatDate} from "@/src/components/dateUtils";
import {mapOptionsToIds, Vote, voteData} from "@/src/components/votesUtil";
import dayjs from "dayjs";
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    ChartOptions,
    Legend,
    LinearScale,
    Title,
    Tooltip,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

type Poll = {
    id: number,
    title: string,
    body: string,
    closeDate: Date,
    options: {
        id: number,
        content: string,
        votes: number[],
    }[],
    votes: Vote[],
    allVotes: number,
}

export const PollComponent: React.FC<Poll> = ({id, body, closeDate, options, votes, allVotes}) => {

    const data = options.map(({id, content}) => ({value: id, label: content}))

    const [value, setValue] = useState<number | null>(votes[0]?.votedOption || 0);

    const pollClosed = dayjs(closeDate).diff(dayjs()) <= 0;

    const pollClosedTime = formatDate(closeDate)

    const onChange = (e: RadioChangeEvent) => {
        setValue(e.target.value);
        fetch("/votes",
            {
                method: "PATCH", body: JSON.stringify({
                    votedPoll: id,
                    votedOption: e.target.value
                }),
            }
        ).then()
    };

    const optionIds = mapOptionsToIds(options);

    const chartData = {
        labels: options.map(({content}) => content),
        datasets: [{
            label: 'Stimmen',
            data: voteData(votes, optionIds),
            backgroundColor: 'rgba(200, 22, 0, 0.2)',
            borderColor: 'rgba(269, 80, 0, 1)',
            borderWidth: 1
        }]
    };

    const chartOptions: ChartOptions = {
        scales: {y: {beginAtZero: true}, x: {ticks: {stepSize: 1}}},
        indexAxis: "y"
    }

    return (
        <div>
            {
                pollClosed ?
                    <div>
                        <div className={"flex flex-row"}>
                            <div
                                className={"flex-1 h-full p-(--standard-padding-in) border-2 border-(--border) rounded-(--border-radius)"}>
                                <span>{body}</span>
                            </div>
                            <div className={"flex-2 p-(--standard-padding-in)"}>
                                <Bar data={chartData} options={chartOptions}/>
                            </div>
                        </div>
                        <div
                            className={"flex flex-col flex-1 h-full p-(--standard-padding-in) border-2 border-(--border) rounded-(--border-radius)"}>
                            <span className={"border-b-2 border-(--border)"}>Stimmen insgesamt: {allVotes}</span>
                            <span>
                                Umfrage wurde am {pollClosedTime} geschlossen
                            </span>
                        </div>
                    </div>
                    :
                    <div>
                        <div className={"flex"}>
                            <div
                                className={"flex flex-col flex-2 min-h-0 border-2 border-(--border) rounded-(--border-radius"}>
                                <h4 className={"font-medium border-b-2 border-(--border) p-(--standard-padding-in)"}>Beschreibung: </h4>
                                <span className={"flex-1 p-(--standard-padding-in)"}>{body}</span>
                                <span
                                    className={"w-full font-light border-t-2 border-(--border) p-(--standard-padding-in)"}>
                                    Umfrage schliesst am {pollClosedTime}
                                </span>
                            </div>
                            <div className={"flex-1 p-(--standard-padding-in) pl-4"}>
                                <Radio.Group
                                    className={"overflow-hidden text-ellipsis text-nowrap whitespace-nowrap shadow-lg "}
                                    buttonStyle={"solid"}
                                    vertical
                                    optionType={"button"}
                                    onChange={onChange}
                                    value={value}
                                    options={data}>
                                </Radio.Group>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}