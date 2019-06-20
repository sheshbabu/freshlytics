import React from "react";
import { Dropdown, DropdownProps, Table, Pagination, PaginationProps } from "semantic-ui-react";

type Props = {
  dimensions: Array<{ text: string; value: string }>;
  selectedDimension: string;
  currentPage: number;
  rows: Array<Row> | null;
  onDimensionChange: (event: React.SyntheticEvent<HTMLElement, Event>, data: DropdownProps) => void;
  onPageChange: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, data: PaginationProps) => void;
};

export type Row = {
  name: string;
  total: string;
  totalrows: string;
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
      <MetricsTableFooter {...props} />
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

function MetricsTableFooter(props: Props) {
  const totalPages = getTotalPage(props);

  if (totalPages === 1) {
    return null;
  }

  return (
    <Table.Footer>
      <Table.Row textAlign="right">
        <Table.HeaderCell colSpan="3">
          <Pagination
            boundaryRange={0}
            defaultActivePage={props.currentPage + 1}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            siblingRange={1}
            totalPages={totalPages}
            onPageChange={props.onPageChange}
          />
        </Table.HeaderCell>
      </Table.Row>
    </Table.Footer>
  );
}

function getTotalPage(props: Props) {
  if (props.rows === null) {
    return 0;
  }

  const LIMIT = 10;
  return Math.ceil(parseInt(props.rows[0].totalrows) / LIMIT);
}
