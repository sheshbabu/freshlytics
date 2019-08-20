import React from "react";
import { Header } from "semantic-ui-react";

type Props = {
  name: string;
};

export default function PageHeader(props: Props) {
  return (
    <Header size="huge" style={{ margin: 0 }}>
      {props.name}
    </Header>
  );
}
