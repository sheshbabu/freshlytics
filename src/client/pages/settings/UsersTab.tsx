import React from "react";
import { Button, Table } from "semantic-ui-react";
import UserModal, { Mode } from "./UserModal";
import styles from "./SettingsPage.css";

type ButtonRowProps = {
  onAddClick: () => void;
};

export default function UsersTab() {
  const [modalMode, setModalMode] = React.useState<Mode>("add");
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  function handleAddClick() {
    setModalMode("add");
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  return (
    <div className={styles.tab_container}>
      <ButtonRow onAddClick={handleAddClick} />
      <ProjectsTable />
      <UserModal isOpen={isModalOpen} mode={modalMode} onClose={handleModalClose} />
    </div>
  );
}

function ButtonRow(props: ButtonRowProps) {
  return (
    <div className={styles.button_row}>
      <Button color="green" onClick={props.onAddClick}>
        Add User
      </Button>
    </div>
  );
}

function ProjectsTable() {
  return (
    <Table celled striped singleLine compact size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={4}>Name</Table.HeaderCell>
          <Table.HeaderCell width={2}>Role</Table.HeaderCell>
          <Table.HeaderCell width={1}>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Shesh</Table.Cell>
          <Table.Cell>Admin</Table.Cell>
          <Table.Cell>
            <Button size="mini" basic>
              Edit
            </Button>
            <Button size="mini" basic>
              Delete
            </Button>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Babu</Table.Cell>
          <Table.Cell>User</Table.Cell>
          <Table.Cell>
            <Button size="mini" basic>
              Edit
            </Button>
            <Button size="mini" basic>
              Delete
            </Button>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Ranjika</Table.Cell>
          <Table.Cell>User</Table.Cell>
          <Table.Cell>
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
