import React from "react";
import { Chart as FrappeChart } from "frappe-charts/dist/frappe-charts.min.esm";
import "./FrappeChartWrapper.css";

type Props = {
  type: "line" | "bar" | "axis-mixed" | "pie" | "percentage" | "heatmap";
  data: {
    labels: Array<string>;
    datasets: Array<{
      values: Array<number>;
    }>;
  };
  colors: Array<string>;
  height: number;
  axisOptions: {
    xAxisMode: "span" | "tick";
    yAxisMode: "span" | "tick";
    xIsSeries: 0 | 1;
  };
};

export default class FrappeChartWrapper extends React.Component<Props> {
  ref: any;
  chart: any;

  componentDidMount() {
    this.chart = new FrappeChart(this.ref, { ...this.props });
  }

  UNSAFE_componentWillReceiveProps(props: Props) {
    this.chart.update(props.data);
  }

  render() {
    return <div ref={chart => (this.ref = chart)} />;
  }
}
