import React from "react";
import { Header, Segment } from "semantic-ui-react";

export default function CreditsSection() {
  return (
    <div>
      <Header as="h5" attached="top">
        Credits
      </Header>
      <Segment attached="bottom">
        {getLink("UI Components", "Semantic UI React", "https://react.semantic-ui.com")}
        {getLink("Illustrations", "Icons8", "https://icons8.com")}
      </Segment>
    </div>
  );
}

function getLink(functionality: string, entityName: string, entityUrl: string) {
  return (
    <div style={{ marginBottom: "10px" }}>
      {functionality} by{" "}
      <a href={entityUrl} target="_blank" rel="noopener noreferrer">
        {entityName}
      </a>
    </div>
  );
}
