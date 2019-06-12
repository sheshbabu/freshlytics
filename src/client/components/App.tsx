import React from "react";
import { Container, Header } from "semantic-ui-react";
import { DatesRangeInput } from "semantic-ui-calendar-react";
import Navbar from "./Navbar";
import Chart from "./Chart";
import MetricsTable from "./MetricsTable";
import styles from "./App.css";

export default function App() {
  return (
    <Container text>
      <Navbar />
      <div className={styles.titlebar}>
        <Header size="huge" style={{ margin: 0 }}>
          Pageviews
        </Header>
        <DatesRangeInput
          name="datesRange"
          placeholder="From - To"
          value=""
          iconPosition="left"
          onChange={() => {}}
        />
      </div>
      <Chart />
      <MetricsTable />
    </Container>
  );
}
