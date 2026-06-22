import React from "react";
import Insight from "../components/InsightCard";
import SetupChart from "../components/SetupChart";
import Emotions from "../components/EmotionChart";
import SessionAnalytics from "../components/sessionana";
function Analytics(){
    return(
        <>
    <Insight />
   <SetupChart />
   <Emotions />
   <SessionAnalytics />
   </>
    )
    
}
export default Analytics;