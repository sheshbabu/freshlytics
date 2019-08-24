import React from "react";
import { Button, Table } from "semantic-ui-react";
import useRequest from "../../../components/useRequest";
import Spinner from "../../../components/Spinner";
import UserModal, { Mode } from "./UserModal";
import { User } from "../../../types/User.type";
import styles from "../SettingsPage.css";

export default function UsersTab() {
  const [users, isLoading, refetch] = useRequest<User[]>("/api/users");
  const [modalMode, setModalMode] = React.useState<Mode>("add");
  const [modalUserId, setModalUserId] = React.useState<string>("");
  const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);

  if (isLoading) {
    return (
      <div className={styles.tab_container}>
        <Spinner />
      </div>
    );
  }

  if (users === null) {
    return null;
  }

  function handleAddClick() {
    setModalMode("add");
    setIsModalOpen(true);
  }

  function handleEditClick(userId: string) {
    setModalMode("edit");
    setModalUserId(userId);
    setIsModalOpen(true);
  }

  function handleDeleteClick(userId: string) {
    setModalMode("delete");
    setModalUserId(userId);
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setModalUserId("");
    setIsModalOpen(false);
    refetch();
  }

  return (
    <div className={styles.tab_container}>
      <div className={styles.button_row}>
        <Button color="green" onClick={handleAddClick}>
          Add User
        </Button>
      </div>
      <UsersTable users={users} onEditClick={handleEditClick} onDeleteClick={handleDeleteClick} />
      <UserModal isOpen={isModalOpen} mode={modalMode} userId={modalUserId} onClose={handleModalClose} />
    </div>
  );
}

type UsersTableProps = {
  users: User[];
  onEditClick: (userId: string) => void;
  onDeleteClick: (userId: string) => void;
};

function UsersTable(props: UsersTableProps) {
  const rows = props.users.map(user => <UsersTableRow key={user.id} user={user} {...props} />);

  return (
    <Table celled striped singleLine compact size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={4}>Name</Table.HeaderCell>
          <Table.HeaderCell width={2}>Role</Table.HeaderCell>
          <Table.HeaderCell width={1}>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{rows}</Table.Body>
    </Table>
  );
}

type UsersTableRowProps = {
  user: User;
  onEditClick: (userId: string) => void;
  onDeleteClick: (userId: string) => void;
};

function UsersTableRow(props: UsersTableRowProps) {
  const user = props.user;
  const role = user.is_admin ? "Admin" : "User";

  return (
    <Table.Row>
      <Table.Cell>{user.name}</Table.Cell>
      <Table.Cell>{role}</Table.Cell>
      <Table.Cell>
        <Button size="mini" basic onClick={() => props.onEditClick(user.id)}>
          Edit
        </Button>
        <Button size="mini" basic onClick={() => props.onDeleteClick(user.id)}>
          Delete
        </Button>
      </Table.Cell>
    </Table.Row>
  );
}
