import React from "react";
import { Button, Form, Header, Message } from "semantic-ui-react";
import request from "../libs/request";
import styles from "./ChangePasswordContainer.css";

export default function ChangePasswordContainer() {
  return (
    <div className={styles.container}>
      <ChangePasswordIllustration />
      <ChangePasswordForm />
    </div>
  );
}

function ChangePasswordForm() {
  const [oldPassword, setOldPassword] = React.useState<string>("");
  const [newPassword, setNewPassword] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  return (
    <div>
      <Header as="h1">Change Password</Header>
      <Message error hidden={error === ""}>
        {error}
      </Message>
      <Form className={styles.form}>
        <Form.Field>
          <label>Old Password</label>
          <input type="password" onChange={e => setOldPassword(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>New Password</label>
          <input type="password" onChange={e => setNewPassword(e.target.value)} />
        </Form.Field>
        <Button type="submit" color="green" onClick={() => handleSubmit(oldPassword, newPassword, setError)}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

function ChangePasswordIllustration() {
  return <div className={styles.illustration} />;
}

async function handleSubmit(oldPassword: string, newPassword: string, setError: Function) {
  try {
    await request("/api/changePassword", "POST", { oldPassword, newPassword });
    setError("");
    location.replace("/");
  } catch (e) {
    setError(e.message);
  }
}
