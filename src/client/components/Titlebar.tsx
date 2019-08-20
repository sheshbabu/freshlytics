import React from "react";
import { DatesRangeInput } from "semantic-ui-calendar-react";
import PageHeader from "./PageHeader";
import styles from "./Titlebar.css";

type DateChangeFunction = (e: React.SyntheticEvent<HTMLElement, Event>, data: any) => void;

type Props = {
  pageName: string;
  dateRange: string;
  onDateChange: DateChangeFunction;
};

export default function Titlebar(props: Props) {
  return (
    <div className={styles.container}>
      <PageHeader name={props.pageName} />
      <DatePicker {...props} />
    </div>
  );
}

function DatePicker(props: Props) {
  return (
    <DatesRangeInput
      name="freshlytics-date-input"
      dateFormat="YYYY-MM-DD"
      placeholder="From - To"
      value={props.dateRange}
      iconPosition="left"
      onChange={props.onDateChange}
    />
  );
}
