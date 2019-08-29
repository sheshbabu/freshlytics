import React from "react";
import { Header, Button } from "semantic-ui-react";
import styles from "./Welcome.css";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div className={styles.container}>
      <div className={styles.banner} />
      <Header as="h2" textAlign="center">
        Welcome!
      </Header>
      <p className={styles.subtitle}>Get started by creating your first project.</p>
      <Link to="/settings">
        <Button color="green">Goto Settings</Button>
      </Link>
    </div>
  );
}
