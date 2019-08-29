import React from "react";
import { Dropdown, DropdownProps } from "semantic-ui-react";
import { DatesRangeInput } from "semantic-ui-calendar-react";
import PageHeader from "./PageHeader";
import { Project } from "../types/Project.type";
import styles from "./Titlebar.css";

type Props = {
  pageName: string;
  projects: Project[];
  dateRange: string;
  onProjectChange: (e: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => void;
  onDateChange: (e: React.SyntheticEvent<HTMLElement, Event>, data: { value: string }) => void;
};

export default function Titlebar(props: Props) {
  const options = props.projects.map(p => ({ text: p.name, value: p.id }));

  return (
    <div className={styles.container}>
      <PageHeader name={props.pageName} />
      <Dropdown
        placeholder="Select Project"
        selection
        defaultValue={options[0].value}
        options={options}
        onChange={props.onProjectChange}
      />
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
