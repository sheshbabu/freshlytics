import React from "react";
import { Button, Form, Header } from "semantic-ui-react";
import styles from "./LoginContainer.css";

export default function LoginContainer() {
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
      <Header as="h1">Welcome!</Header>
      <Form className={styles.form}>
        <Form.Field>
          <label>Username</label>
          <input />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type="password" />
        </Form.Field>
        <Button type="submit" color="green">
          Sign In
        </Button>
      </Form>
    </div>
  );
}

function LoginIllustration() {
  return <div className={styles.illustration} />;
}
