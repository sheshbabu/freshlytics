import React from "react";
import { Loader } from "semantic-ui-react";
import styles from "./Spinner.css";

type Props = {
  isFullHeight?: boolean;
};

export default function Spinner(props: Props) {
  const className = props.isFullHeight ? styles.full_height : styles.fixed_height;

  return (
    <div className={className}>
      <Loader active inline="centered">
        Loading
      </Loader>
    </div>
  );
}
