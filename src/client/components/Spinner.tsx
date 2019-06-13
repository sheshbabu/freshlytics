import React from "react";
import { Loader } from "semantic-ui-react";
import styles from "./Spinner.css";

export default function Spinner() {
  return (
    <div className={styles.container}>
      <Loader active inline="centered">
        Loading
      </Loader>
    </div>
  );
}
