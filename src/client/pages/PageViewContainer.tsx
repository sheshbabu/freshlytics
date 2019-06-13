import React from "react";
import { Container, Divider } from "semantic-ui-react";
import Titlebar from "../components/Titlebar";
import Chart from "../components/Chart";
import MetricsTable from "../components/MetricsTable";
import Spinner from "../components/Spinner";

export default class PageViewContainer extends React.Component {
  state = {
    pageViewTotals: null,
    pageViewsByPath: null,
    pageViewsByReferrer: null,
    pageViewsByBrowserName: null,
    pageViewsByBrowserNameVersion: null,
    isLoading: true
  };

  async componentDidMount() {
    const results = await Promise.all([
      this.fetch("/api/metric/pageview"),
      this.fetch("/api/metric/pageview/path"),
      this.fetch("/api/metric/pageview/referrer"),
      this.fetch("/api/metric/pageview/browserName"),
      this.fetch("/api/metric/pageview/browserNameVersion")
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

  async fetch(path: string) {
    const response = await fetch(path);
    return await response.json();
  }

  render() {
    const {
      pageViewTotals,
      pageViewsByPath,
      pageViewsByReferrer,
      pageViewsByBrowserName,
      pageViewsByBrowserNameVersion,
      isLoading
    } = this.state;

    if (isLoading) {
      return <Spinner />;
    }

    return (
      <Container text>
        <Divider hidden />
        <Titlebar />
        <Divider hidden />
        <Chart pageViews={pageViewTotals} />
        <Divider hidden />
        <MetricsTable columnName="Pages" rows={pageViewsByPath} />
        <Divider hidden />
        <MetricsTable columnName="Referrers" rows={pageViewsByReferrer} />
        <Divider hidden />
        <MetricsTable columnName="Browsers" rows={pageViewsByBrowserName} />
        <Divider hidden />
        <MetricsTable
          columnName="Browser Versions"
          rows={pageViewsByBrowserNameVersion}
        />
        <Divider hidden />
      </Container>
    );
  }
}
