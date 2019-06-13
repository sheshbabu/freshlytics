import React from "react";
import { Container, Header, Segment, Divider } from "semantic-ui-react";
import { DatesRangeInput } from "semantic-ui-calendar-react";
import Chart from "./Chart";
import MetricsTable from "./MetricsTable";
import styles from "./App.css";

export default function App() {
  return (
    <Container text>
      <Divider hidden />
      <div className={styles.titlebar}>
        <Header size="huge" style={{ margin: 0 }}>
          Pageviews
        </Header>
        <Divider hidden />
        <DatesRangeInput
          name="datesRange"
          placeholder="From - To"
          value=""
          iconPosition="left"
          onChange={() => {}}
        />
      </div>
      <Divider hidden />
      <Segment style={{ boxShadow: "none" }}>
        <Chart />
      </Segment>
      <Divider hidden />
      <MetricsTable />
    </Container>
  );
}
