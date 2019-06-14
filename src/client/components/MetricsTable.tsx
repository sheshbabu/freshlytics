import React from "react";
import { Table } from "semantic-ui-react";

type Props = {
  columnName: string;
  rows: Array<Row> | null;
};

type Row = {
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
        <Table.HeaderCell width={9}>{props.columnName}</Table.HeaderCell>
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
