import React from "react";
import { Button, Form, Header, Message } from "semantic-ui-react";
import request from "../../libs/request";
import styles from "./LoginPage.css";

export default function LoginPage() {
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
  const [error, setError] = React.useState<string>("");

  return (
    <div className={styles.form}>
      <Header as="h1">Welcome!</Header>
      <Message error hidden={error === ""}>
        {error}
      </Message>
      <Form>
        <Form.Field>
          <label>Username</label>
          <input name="username" value={username} onChange={e => setUsername(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
        </Form.Field>
        <Button type="submit" color="green" onClick={() => handleSubmit(username, password, setError)}>
          Sign In
        </Button>
      </Form>
    </div>
  );
}

function LoginIllustration() {
  return <div className={styles.illustration} />;
}

async function handleSubmit(username: string, password: string, setError: Function) {
  try {
    const response = await request("/api/login", "POST", { username, password });
    localStorage.setItem("isAuthenticated", "true");
    setError("");

    if (response.shouldForcePasswordChange) {
      location.replace("/password");
    } else {
      location.replace("/");
    }
  } catch (e) {
    setError(e.message);
  }
}
