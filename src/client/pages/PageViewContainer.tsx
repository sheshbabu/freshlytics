import React from "react";
import { Container, Divider } from "semantic-ui-react";
import Titlebar from "../components/Titlebar";
import Chart from "../components/Chart";
import MetricsTable from "../components/MetricsTable";
import Spinner from "../components/Spinner";

const DEFAULT_PROJECT_ID = 1000;

export default class PageViewContainer extends React.Component {
  state = {
    pageViewTotals: null,
    pageViewsByPath: null,
    pageViewsByReferrer: null,
    pageViewsByBrowserName: null,
    pageViewsByBrowserNameVersion: null,
    dateRange: "",
    isLoading: true
  };

  componentDidMount() {
    this.makeRequests();
  }

  async makeRequests() {
    const results = await Promise.all([
      this.request("/api/metric/pageview"),
      this.request("/api/metric/pageview/path"),
      this.request("/api/metric/pageview/referrer"),
      this.request("/api/metric/pageview/browserName"),
      this.request("/api/metric/pageview/browserNameVersion")
    ]);

    this.setState({
      pageViewTotals: results[0],
      pageViewsByPath: results[1],
      pageViewsByReferrer: results[2],
      pageViewsByBrowserName: results[3],
      pageViewsByBrowserNameVersion: results[4],
      isLoading: false
    });
  }

  async request(path: string) {
    const projectId = DEFAULT_PROJECT_ID;
    const startDate = this.state.dateRange.split(" - ")[0];
    const endDate = this.state.dateRange.split(" - ")[1];

    path = `${path}?projectId=${projectId}`;

    if (startDate !== "" && endDate !== "") {
      path = `${path}&startDate=${startDate}&endDate=${endDate}`;
    }

    const response = await fetch(path);
    return await response.json();
  }

  handleDateChange = (_event: React.SyntheticEvent, data: any) => {
    const dateRange = data.value;
    this.setState({ dateRange }, this.makeRequests);
  };

  render() {
    const {
      pageViewTotals,
      pageViewsByPath,
      pageViewsByReferrer,
      pageViewsByBrowserName,
      pageViewsByBrowserNameVersion,
      isLoading,
      dateRange
    } = this.state;

    if (isLoading) {
      return <Spinner />;
    }

    return (
      <Container text>
        <Divider hidden />
        <Titlebar dateRange={dateRange} onDateChange={this.handleDateChange} />
        <Divider hidden />
        <Chart pageViews={pageViewTotals} />
        <Divider hidden />
        <MetricsTable columnName="Pages" rows={pageViewsByPath} />
        <Divider hidden />
        <MetricsTable columnName="Referrers" rows={pageViewsByReferrer} />
        <Divider hidden />
        <MetricsTable columnName="Browsers" rows={pageViewsByBrowserName} />
        <Divider hidden />
        <MetricsTable columnName="Browser Versions" rows={pageViewsByBrowserNameVersion} />
        <Divider hidden />
      </Container>
    );
  }
}
