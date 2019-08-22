import React from "react";
import { Button, Form, Header, Message } from "semantic-ui-react";
import { RouteComponentProps } from "react-router";
import request from "../../libs/request";
import styles from "./ChangePasswordPage.css";

export default function ChangePasswordPage(props: RouteComponentProps) {
  return (
    <div className={styles.container}>
      <ChangePasswordIllustration />
      <ChangePasswordForm {...props} />
    </div>
  );
}

function ChangePasswordForm(props: RouteComponentProps) {
  const [oldPassword, setOldPassword] = React.useState<string>("");
  const [newPassword, setNewPassword] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  async function handleSubmit() {
    try {
      await request("/api/change_password", "POST", { oldPassword, newPassword });
      setError("");
      props.history.push("/");
    } catch (e) {
      setError(e.message);
    }
  }

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
        <Button type="submit" color="green" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

function ChangePasswordIllustration() {
  return <div className={styles.illustration} />;
}
