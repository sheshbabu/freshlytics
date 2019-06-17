import React from "react";
import { Container, Divider } from "semantic-ui-react";
import Titlebar from "../components/Titlebar";
import Chart, { PageViewCount } from "../components/Chart";
import MetricsTable, { Row } from "../components/MetricsTable";
import Spinner from "../components/Spinner";
import NoResults from "../components/NoResults";

const DEFAULT_PROJECT_ID = 1000;

type State = {
  pageViewTotals: PageViewCount[] | null;
  pageViewsByPath: Array<Row> | null;
  pageViewsByReferrer: Array<Row> | null;
  pageViewsByBrowserName: Array<Row> | null;
  pageViewsByBrowserNameVersion: Array<Row> | null;
  dateRange: string;
  isLoading: boolean;
};

export default class PageViewContainer extends React.Component {
  state: State = {
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
    const startDate = dateRange.split(" - ")[0];
    const endDate = dateRange.split(" - ")[1];

    this.setState({ dateRange }, () => startDate !== "" && endDate !== "" && this.makeRequests());
  };

  render() {
    const {
      pageViewTotals,
      pageViewsByPath,
      pageViewsByReferrer,
      pageViewsByBrowserName,
      pageViewsByBrowserNameVersion,
      dateRange,
      isLoading
    } = this.state;

    let content = <NoResults />;

    if (isLoading) {
      content = <Spinner />;
    }

    if (pageViewTotals !== null && pageViewTotals.length !== 0) {
      content = (
        <>
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
        </>
      );
    }

    return (
      <Container text>
        <Divider hidden />
        <Titlebar dateRange={dateRange} onDateChange={this.handleDateChange} />
        {content}
      </Container>
    );
  }
}
