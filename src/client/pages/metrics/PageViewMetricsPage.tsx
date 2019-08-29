import React from "react";
import { Divider, DropdownProps } from "semantic-ui-react";
import Titlebar from "../../components/Titlebar";
import Chart, { PageViewsByDateRow } from "../../components/Chart";
import MetricsTable, { Row } from "../../components/MetricsTable";
import Spinner from "../../components/Spinner";
import NoResults from "../../components/NoResults";
import request from "../../libs/request";
import { Project } from "../../types/Project.type";

const DIMENSIONS = [
  { text: "Path", value: "path" },
  { text: "Referrers", value: "referrer" },
  { text: "Browsers", value: "browser_name" },
  { text: "Browser Versions", value: "browser_name_version" }
];

type Props = {
  projects: Project[];
};

type State = {
  pageViewTotals: PageViewsByDateRow[] | null;
  pageViewsByDimension: Array<Row> | null;
  selectedDimension: string;
  currentPage: number;
  projectId: string;
  dateRange: string;
  isLoading: boolean;
};

export default class PageViewMetricsPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      pageViewTotals: null,
      pageViewsByDimension: null,
      selectedDimension: DIMENSIONS[0].value,
      currentPage: 0,
      projectId: props.projects[0].id,
      dateRange: "",
      isLoading: true
    };
  }

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
    const projectId = this.state.projectId;
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

  handleProjectChange = (e: React.SyntheticEvent, data: DropdownProps) => {
    const projectId = data.value as string;
    this.setState({ projectId }, this.makeRequests);
  };

  handleDateChange = (e: React.SyntheticEvent, data: { value: string }) => {
    const dateRange = data.value;
    const startDate = dateRange.split(" - ")[0];
    const endDate = dateRange.split(" - ")[1];

    this.setState({ dateRange, currentPage: 0 }, () => startDate !== "" && endDate !== "" && this.makeRequests());
  };

  handleDimensionChange = (e: React.SyntheticEvent, data: DropdownProps) => {
    const selectedDimension = data.value as string;
    this.setState({ selectedDimension, currentPage: 0 }, this.makeRequests);
  };

  handlePageChange = (e: React.SyntheticEvent, data: DropdownProps) => {
    this.setState({ currentPage: data.activePage - 1 }, this.makeRequests);
  };

  render() {
    const { pageViewTotals, pageViewsByDimension, dateRange, isLoading } = this.state;

    let content = <NoResults />;

    if (isLoading) {
      content = <Spinner isFullHeight />;
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
      <>
        <Titlebar
          pageName="Page Views"
          projects={this.props.projects}
          dateRange={dateRange}
          onProjectChange={this.handleProjectChange}
          onDateChange={this.handleDateChange}
        />
        {content}
      </>
    );
  }
}
