import React from "react";
import { Container, Divider } from "semantic-ui-react";
import Titlebar from "../components/Titlebar";
import Chart, { PageViewsByDateRow } from "../components/Chart";
import MetricsTable, { Row } from "../components/MetricsTable";
import Spinner from "../components/Spinner";
import NoResults from "../components/NoResults";
import request from "../libs/request";

const DEFAULT_PROJECT_ID = 1000;

const DIMENSIONS = [
  { text: "Path", value: "path" },
  { text: "Referrers", value: "referrer" },
  { text: "Browsers", value: "browser_name" },
  { text: "Browser Versions", value: "browser_name_version" }
];

type State = {
  pageViewTotals: PageViewsByDateRow[] | null;
  pageViewsByDimension: Array<Row> | null;
  selectedDimension: string;
  currentPage: number;
  dateRange: string;
  isLoading: boolean;
};

export default class PageViewContainer extends React.Component {
  state: State = {
    pageViewTotals: null,
    pageViewsByDimension: null,
    selectedDimension: DIMENSIONS[0].value,
    currentPage: 0,
    dateRange: "",
    isLoading: true
  };

  componentDidMount() {
    this.makeRequests();
  }

  async makeRequests() {
    const results = await Promise.all([
      this.makeRequest("/api/events/pageviews"),
      this.makeRequest("/api/events/pageviews", this.state.selectedDimension, this.state.currentPage)
    ]);

    this.setState({
      pageViewTotals: results[0],
      pageViewsByDimension: results[1],
      isLoading: false
    });
  }

  async makeRequest(path: string, dimension?: string, page?: number) {
    const projectId = DEFAULT_PROJECT_ID;
    const startDate = this.state.dateRange.split(" - ")[0];
    const endDate = this.state.dateRange.split(" - ")[1];

    path = `${path}?project_id=${projectId}`;

    if (startDate !== "" && endDate !== "") {
      path = `${path}&start_date=${startDate}&end_date=${endDate}`;
    }

    if (dimension) {
      path = `${path}&dimension=${dimension}`;
    }

    if (page) {
      path = `${path}&page=${page}`;
    }

    return await request(path);
  }

  handleDateChange = (_event: React.SyntheticEvent, data: any) => {
    const dateRange = data.value;
    const startDate = dateRange.split(" - ")[0];
    const endDate = dateRange.split(" - ")[1];

    this.setState({ dateRange, currentPage: 0 }, () => startDate !== "" && endDate !== "" && this.makeRequests());
  };

  handleDimensionChange = (_event: React.SyntheticEvent, data: any) => {
    this.setState({ selectedDimension: data.value, currentPage: 0 }, this.makeRequests);
  };

  handlePageChange = (_event: React.SyntheticEvent, data: any) => {
    this.setState({ currentPage: data.activePage - 1 }, this.makeRequests);
  };

  render() {
    const { pageViewTotals, pageViewsByDimension, dateRange, isLoading } = this.state;

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
          <MetricsTable
            dimensions={DIMENSIONS}
            currentPage={this.state.currentPage}
            selectedDimension={this.state.selectedDimension}
            rows={pageViewsByDimension}
            onDimensionChange={this.handleDimensionChange}
            onPageChange={this.handlePageChange}
          />
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
