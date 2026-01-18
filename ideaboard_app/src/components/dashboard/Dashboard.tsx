"use client"

import { DashboardTabs } from "./DashboardTabs";
import { TopThreeIdeas} from "./TopThreeIdeas";

export const Dashboard = () => {

    return(
        <div className="flex flex-row flex-1 gap-4 h-dvh m-4 mt-0">
            <div className="flex-9">
                <DashboardTabs/>
            </div>
            <div className="flex-1">
                <TopThreeIdeas/>
            </div>
        </div>
    );
}