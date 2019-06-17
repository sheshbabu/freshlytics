import React from "react";
import { Button, Form, Header } from "semantic-ui-react";
import styles from "./ChangePasswordContainer.css";

export default function ChangePasswordContainer() {
  return (
    <div className={styles.container}>
      <LoginIllustration />
      <LoginForm />
    </div>
  );
}

function LoginForm() {
  return (
    <div>
      <Header as="h1">Change Password</Header>
      <Form className={styles.form}>
        <Form.Field>
          <label>Old Password</label>
          <input type="password" />
        </Form.Field>
        <Form.Field>
          <label>New Password</label>
          <input type="password" />
        </Form.Field>
        <Button type="submit" color="green">
          Submit
        </Button>
      </Form>
    </div>
  );
}

function LoginIllustration() {
  return <div className={styles.illustration} />;
}
