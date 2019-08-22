import React from "react";
import { Button, Form, Header, Message } from "semantic-ui-react";
import { RouteComponentProps } from "react-router";
import { AppContext } from "../../App";
import request from "../../libs/request";
import styles from "./LoginPage.css";

export default function LoginPage(props: RouteComponentProps) {
  return (
    <div className={styles.container}>
      <LoginIllustration />
      <LoginForm {...props} />
    </div>
  );
}

function LoginForm(props: RouteComponentProps) {
  const { setUser } = React.useContext(AppContext);
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  async function handleSubmit() {
    try {
      const response = await request("/api/login", "POST", { username, password });
      localStorage.setItem("isAuthenticated", "true");
      setError("");
      setUser(response.user);

      if (response.shouldForcePasswordChange) {
        props.history.push("/password");
      } else {
        props.history.push("/");
      }
    } catch (e) {
      setError(e.message);
    }
  }

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
        <Button type="submit" color="green" onClick={handleSubmit}>
          Sign In
        </Button>
      </Form>
    </div>
  );
}

function LoginIllustration() {
  return <div className={styles.illustration} />;
}
