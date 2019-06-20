import React from "react";
import { Dropdown, DropdownProps, Table } from "semantic-ui-react";

type Props = {
  dimensions: Array<{ text: string; value: string }>;
  selectedDimension: string;
  rows: Array<Row> | null;
  onDimensionChange: (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => void;
};

export type Row = {
  name: string;
  total: string;
};

export default function MetricsTable(props: Props) {
  if (props.rows === null) {
    return null;
  }

  const rows = props.rows.map((row, index) => <MetricsTableRow key={index} {...row} />);

  return (
    <Table celled striped singleLine compact size="small">
      <MetricsTableHeader {...props} />
      <Table.Body>{rows}</Table.Body>
    </Table>
  );
}

function MetricsTableHeader(props: Props) {
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell width={9}>
          <Dropdown
            inline
            options={props.dimensions}
            defaultValue={props.selectedDimension}
            onChange={props.onDimensionChange}
          />
        </Table.HeaderCell>
        <Table.HeaderCell width={1} textAlign="right">
          Total Page Views
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );
}

function MetricsTableRow(props: Row) {
  return (
    <Table.Row>
      <Table.Cell>{props.name}</Table.Cell>
      <Table.Cell textAlign="right">{props.total}</Table.Cell>
    </Table.Row>
  );
}
