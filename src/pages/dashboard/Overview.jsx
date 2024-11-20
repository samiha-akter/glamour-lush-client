import React from "react";
import OverviewCard from "../../components/dashboard/OverviewCard";
import Heading from "../../components/Heading";

export default function Overview() {
  return (
    <div className="flex flex-col items-center justify-center py-11">
      <Heading text={"User Overview"}/>
      <OverviewCard />
    </div>
  );
}
