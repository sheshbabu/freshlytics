import React from "react";
import format from "date-fns/format";
import { Segment } from "semantic-ui-react";
import FrappeChartWrapper from "./FrappeChartWrapper";

type PageViewCount = {
  date: string;
  total: string;
};

type Props = {
  pageViews: PageViewCount[] | null;
};

export default function Chart(props: Props) {
  const { pageViews } = props;

  if (pageViews === null) {
    return null;
  }

  return (
    <Segment style={{ boxShadow: "none" }}>
      <FrappeChartWrapper
        type="bar"
        colors={["#21ba45"]}
        axisOptions={{ xAxisMode: "tick", yAxisMode: "tick", xIsSeries: 1 }}
        height={250}
        data={{
          labels: pageViews.map(d => format(d.date, "DD MMM YY")),
          datasets: [{ values: pageViews.map(d => parseInt(d.total, 10)) }]
        }}
      />
    </Segment>
  );
}
