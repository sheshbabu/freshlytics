import React from "react";
import { Button, Form, Header } from "semantic-ui-react";
import request from "../request";
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
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");

  return (
    <div className={styles.form}>
      <Header as="h1">Welcome!</Header>
      <Form>
        <Form.Field>
          <label>Username</label>
          <input name="username" value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Field>
        <Button type="submit" color="green" onClick={() => handleSubmit(username, password)}>
          Sign In
        </Button>
      </Form>
    </div>
  );
}

function LoginIllustration() {
  return <div className={styles.illustration} />;
}

async function handleSubmit(username: string, password: string) {
  const response = await request("/api/login", "POST", JSON.stringify({ username, password }));

  if (response.shouldForcePasswordChange) {
    location.replace("/password");
  } else {
    location.replace("/");
  }
}
