import React from "react";
import { Button, Table } from "semantic-ui-react";
import styles from "../SettingsPage.css";

export default function ProjectsTab() {
  return (
    <div className={styles.tab_container}>
      <ButtonRow />
      <ProjectsTable />
    </div>
  );
}

function ButtonRow() {
  return (
    <div className={styles.button_row}>
      <Button color="green">Add Project</Button>
    </div>
  );
}

function ProjectsTable() {
  return (
    <Table celled striped singleLine compact size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={4}>Name</Table.HeaderCell>
          <Table.HeaderCell width={2}>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Web</Table.Cell>
          <Table.Cell>
            <Button size="mini" basic>
              Setup Instructions
            </Button>
            <Button size="mini" basic>
              Edit
            </Button>
            <Button size="mini" basic>
              Delete
            </Button>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>iOS</Table.Cell>
          <Table.Cell>
            <Button size="mini" basic>
              Setup Instructions
            </Button>
            <Button size="mini" basic>
              Edit
            </Button>
            <Button size="mini" basic>
              Delete
            </Button>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
