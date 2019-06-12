import React from "react";
import format from "date-fns/format";
import FrappeChartWrapper from "./FrappeChartWrapper";

type PageViewCount = {
  date: string;
  total: string;
};

type State = PageViewCount[] | null;

export default function Chart() {
  const [pageViews, setPageViews] = React.useState<State>(null);

  React.useEffect(() => {
    fetch("/api/metric/pageview")
      .then(response => response.json())
      .then(data => setPageViews(data));
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
