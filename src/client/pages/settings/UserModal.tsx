import React from "react";
import { Modal, Button, Checkbox, Form } from "semantic-ui-react";
import styles from "./SettingsPage.css";

type Props = {
  isOpen: boolean;
  mode: Mode;
  onClose: () => void;
};

export type Mode = "add" | "edit";

export default function UserModal(props: Props) {
  const { isOpen, mode, onClose } = props;
  const title = mode === "add" ? "Add User" : "Edit User";

  return (
    <Modal size="mini" open={isOpen} onClose={onClose}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input placeholder="Name" />
          </Form.Field>
          <Form.Field>
            <label>Role</label>
            <Checkbox label="Make this user admin" />
          </Form.Field>
          <div className={styles.button_row}>
            <Button color="green">Save</Button>
          </div>
        </Form>
      </Modal.Content>
    </Modal>
  );
}
