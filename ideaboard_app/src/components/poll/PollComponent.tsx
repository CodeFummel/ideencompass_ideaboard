"use client"

import React, {useState} from "react";

import {Radio, RadioChangeEvent} from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import {Bar} from "react-chartjs-2";
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
    votes: {
        votedOption: number,
    }[],
    _count: number,
}

export const PollComponent: React.FC<Poll> = ({id, body, closeDate, options, votes, _count}) => {

    const data = options.map(({id, content}) => ({value: id, label: content}))

    const [value, setValue] = useState<number | null>(votes[0]?.votedOption || 0);

    const pollClosed = true//dayjs(closeDate).diff(dayjs()) <= 0;

    //console.log(options.map(({votes}) => votes))

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

    const chartData = {
        labels: options.map(({content}) => content),
        datasets: [{
            label: '# anzahl an Stimmen',
            data: [votes.map(votedOption => votedOption)], // or [votes.map(votes => votes.lenght)]
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
                            className={"flex-1 h-full p-(--standard-padding-in) border-2 border-(--border) rounded-(--border-radius)"}>
                            <span className={"border-b-2 border-(--border)"}>Stimmen insgesamt: {_count}</span>
                            <span>
                                Umfrage wurde am {(() => {
                                    dayjs.extend(customParseFormat);
                                    dayjs.extend(utc);
                                    const date = dayjs(closeDate, 'YYYY-MM-DD HH:mm:ssss', 'de');
                                    return date.local().format("DD.MM.YYYY u[m] HH:mm");
                                })()} geschlossen {}
                        </span>
                        </div>
                    </div>
                    :
                    <div>
                        <div
                            className={"p-(--standard-padding-in) border-2 border-(--border) rounded-(--border-radius)"}>
                            <span>{body}</span>
                        </div>
                        <div className={"p-(--standard-padding-in)"}>
                            <Radio.Group
                                buttonStyle={"outline"}
                                vertical
                                onChange={onChange}
                                value={value}
                                options={data}>
                            </Radio.Group>
                        </div>
                        <div className={"border-t-2 border-(--border)"}>
                            <span>
                                Umfrage schliesst am {(() => {
                                dayjs.extend(customParseFormat);
                                dayjs.extend(utc);
                                const date = dayjs(closeDate, 'YYYY-MM-DD HH:mm:ssss', 'de');
                                return date.local().format("DD.MM.YYYY u[m] HH:mm");
                            })()} {}
                            </span>
                        </div>
                    </div>
            }
        </div>
    )
}