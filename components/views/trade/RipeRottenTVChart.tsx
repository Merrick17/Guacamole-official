"use client";
import RipeRottenCandleChart from "./RipeRottenChart";
import RipeRottenHeader from "./RipeRottenHeader";

const RipeRottenTVChart = () => {
  

  return (
    <div className="flex flex-col gap-5 w-full ">
      <RipeRottenHeader />

      <RipeRottenCandleChart />
    </div>
  );
};

export default RipeRottenTVChart;
