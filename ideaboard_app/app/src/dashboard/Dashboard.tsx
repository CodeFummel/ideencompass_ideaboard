"use client"

import {DashboardTabs} from "./DashboardTabs";
import {Sidebar} from "./Sidebar";

export const Dashboard = () => {

    const username = "Lynette";

    return(
        <div className="flex flex-row flex-1 gap-(--flex-gap)">
            <DashboardTabs />
            <Sidebar username={username}/>
        </div>
    );
}