import React from "react";
import { Modal, Button, Checkbox, Form, Message } from "semantic-ui-react";
import request from "../../../libs/request";
import { User } from "../../../types/User.type";

type Props = {
  isOpen: boolean;
  mode: Mode;
  userId: string;
  onClose: () => void;
};

export type Mode = "add" | "edit" | "delete";

export default function UserModal(props: Props) {
  const { isOpen, mode, userId, onClose } = props;
  const title = mode === "add" ? "Add User" : "Edit User";

  const [user, setUser] = React.useState<User>({ id: "", name: "", is_admin: false });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    setUser({ id: "", name: "", is_admin: false });
    setIsLoading(false);
    setError("");

    if (isOpen && mode === "edit") {
      request(`/api/users/${userId}`).then(setUser);
    }
  }, [isOpen]);

  async function handleDelete() {
    try {
      setIsLoading(true);
      await request(`/api/users/${userId}`, "DELETE");
      handleClose();
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSave() {
    const url = mode === "add" ? "/api/users" : `/api/users/${userId}`;
    const method = mode === "add" ? "POST" : "PUT";

    try {
      setIsLoading(true);
      await request(url, method, { user });
      handleClose();
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleClose() {
    onClose();
  }

  if (mode === "delete") {
    return (
      <Modal size="mini" open={isOpen} onClose={handleClose}>
        <Message error hidden={error === ""} attached="top">
          {error}
        </Message>
        <Modal.Header>Are you sure you want to delete this user?</Modal.Header>
        <Modal.Actions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="red" onClick={handleDelete} loading={isLoading}>
            Delete
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  return (
    <Modal size="mini" open={isOpen} onClose={handleClose}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        <Message error hidden={error === ""}>
          {error}
        </Message>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input placeholder="Name" value={user.name} onChange={e => setUser({ ...user, name: e.target.value })} />
          </Form.Field>
          <Form.Field>
            <label>Role</label>
            <Checkbox
              label="Make this user admin"
              checked={user.is_admin}
              onChange={(_, d) => setUser({ ...user, is_admin: Boolean(d.checked) })}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={handleSave}>
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
