import React from "react";
import { Header, Divider } from "semantic-ui-react";
import { DatesRangeInput } from "semantic-ui-calendar-react";
import styles from "./Titlebar.css";

export default function Titlebar() {
  return (
    <div className={styles.container}>
      <PageHeader />
      <DatePicker />
    </div>
  );
}

function PageHeader() {
  return (
    <Header size="huge" style={{ margin: 0 }}>
      Pageviews
    </Header>
  );
}

function DatePicker() {
  return (
    <DatesRangeInput
      name="datesRange"
      placeholder="From - To"
      value=""
      iconPosition="left"
      onChange={() => {}}
    />
  );
}
