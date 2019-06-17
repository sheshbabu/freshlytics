import React from "react";
import { Header } from "semantic-ui-react";
import styles from "./NoResults.css";

export default function NoResults() {
  return (
    <>
      <div className={styles.container} />
      <Header as="h2" textAlign="center" disabled>
        No records found
      </Header>
    </>
  );
}
