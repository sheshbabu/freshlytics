import React from "react";
import { Modal, Button, Input, Message, Divider, Icon } from "semantic-ui-react";
import Clipboard from "react-clipboard.js";
import styles from "./ProjectSetupModal.css";

type Props = {
  isOpen: boolean;
  projectId: string;
  onClose: () => void;
};

export default function ProjectSetupModal(props: Props) {
  const { isOpen, projectId, onClose } = props;
  const initialBaseUrl = localStorage.getItem("baseUrl") || "";

  const codeRef = React.useRef<HTMLPreElement>(null);
  const [url, setUrl] = React.useState<string>(initialBaseUrl);

  const code = `(function() {
    var COLLECT_URL = "${url}/collect";
    var PROJECT_ID = "${projectId}";
    var GLOBAL_VAR_NAME = "__freshlytics__";
  
    window[GLOBAL_VAR_NAME] = {};
  
    window[GLOBAL_VAR_NAME].sendPageView = function() {
      var path = location.pathname;
      var referrer = document.referrer;
  
      var url =
        COLLECT_URL +
        "?project_id=" +
        PROJECT_ID +
        "&path=" +
        encodeURIComponent(path) +
        "&referrer=" +
        encodeURIComponent(referrer);
  
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url);
      xhr.send();
    };
  
    window[GLOBAL_VAR_NAME].sendPageView();
  })();`;

  function handleUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUrl(e.target.value);
    localStorage.setItem("baseUrl", e.target.value);
  }

  return (
    <Modal size="large" open={isOpen} onClose={onClose}>
      <Modal.Header>Setup Instructions</Modal.Header>
      <Modal.Content scrolling>
        <Message>
          <p>Enter the Base URL of the server below and copy paste the code snippet below in your HTML file</p>
        </Message>
        <div className={styles.toolbar}>
          <div className={styles.button_container}>
            <Input label="Base URL" placeholder="Enter Base URL" defaultValue={url} fluid onChange={handleUrlChange} />
          </div>
          <Clipboard component="div" option-text={() => codeRef.current && codeRef.current.innerHTML}>
            <Button color="green" icon labelPosition="right">
              Copy to clipboard
              <Icon name="copy" />
            </Button>
          </Clipboard>
        </div>
        <Message>
          <pre ref={codeRef} className={styles.code}>
            {code}
          </pre>
        </Message>
        <Divider hidden />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>Close</Button>
      </Modal.Actions>
    </Modal>
  );
}
