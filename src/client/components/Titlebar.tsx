import React from "react";
import { Header, Divider } from "semantic-ui-react";
import { DatesRangeInput } from "semantic-ui-calendar-react";
import styles from "./Titlebar.css";

type DateChangeFunction = (e: React.SyntheticEvent<HTMLElement, Event>, data: any) => void;

type Props = {
  dateRange: string;
  onDateChange: DateChangeFunction;
};

export default function Titlebar(props: Props) {
  return (
    <div className={styles.container}>
      <PageHeader />
      <DatePicker {...props} />
    </div>
  );
}

function PageHeader() {
  return (
    <Header size="huge" style={{ margin: 0 }}>
      Page Views
    </Header>
  );
}

function DatePicker(props: Props) {
  return (
    <DatesRangeInput
      name="raylight-date-input"
      dateFormat="YYYY-MM-DD"
      placeholder="From - To"
      value={props.dateRange}
      iconPosition="left"
      onChange={props.onDateChange}
    />
  );
}
