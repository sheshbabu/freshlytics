import React from "react";
import { Table } from "semantic-ui-react";

type State = Array<Row> | null;

type Row = {
  path: string;
  total: string;
};

export default function MetricsTable() {
  const [rows, setRows] = React.useState<State>(null);

  React.useEffect(() => {
    fetch("/api/metric/pageview/path")
      .then(response => response.json())
      .then(setRows);
  }, []);

  if (rows === null) {
    return null;
  }

  const tableRows = rows.map((row, index) => (
    <MetricsTableRow key={index} {...row} />
  ));

  return (
    <Table celled striped singleLine>
      <MetricsTableHeader />
      <Table.Body>{tableRows}</Table.Body>
    </Table>
  );
}

function MetricsTableHeader() {
  return (
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell width={4}>Path</Table.HeaderCell>
        <Table.HeaderCell width={1} textAlign="right">
          PageViews
        </Table.HeaderCell>
      </Table.Row>
    </Table.Header>
  );
}

function MetricsTableRow(props: Row) {
  return (
    <Table.Row>
      <Table.Cell>{props.path}</Table.Cell>
      <Table.Cell textAlign="right">{props.total}</Table.Cell>
    </Table.Row>
  );
}
