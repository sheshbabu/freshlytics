import React from "react";
import format from "date-fns/format";
import FrappeChartWrapper from "./FrappeChartWrapper";

type PageViewCount = {
  date: string;
  total: string;
};

type State = null | PageViewCount[];

export default function Chart() {
  const [pageViews, setPageViews] = React.useState<State>(null);

  React.useEffect(() => {
    getData(setPageViews);
  }, []);

  if (pageViews === null) {
    return null;
  }

  return (
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
  );
}

async function getData(setPageViews: Function) {
  const response = await fetch("/api/metric/pageview");
  const data = await response.json();
  setPageViews(data);
}
