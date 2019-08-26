import React from "react";
import { Modal, Button, Form, Message } from "semantic-ui-react";
import request from "../../../libs/request";
import TimezoneDropdown from "../../../components/TimezoneDropdown";
import { Project } from "../../../types/Project.type";

type Props = {
  isOpen: boolean;
  mode: Mode;
  projectId: string;
  onClose: () => void;
};

export type Mode = "add" | "edit" | "delete";

export default function ProjectModal(props: Props) {
  const { isOpen, mode, projectId, onClose } = props;
  const title = mode === "add" ? "Add Project" : "Edit Project";

  const [project, setProject] = React.useState<Project>({ id: "", name: "", timezone: "" });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    if (mode !== "edit") {
      return;
    }

    request(`/api/projects/${projectId}`).then((project: Project) => {
      setProject(project);
    });
  }, [mode, projectId]);

  async function handleDelete() {
    try {
      setIsLoading(true);
      await request(`/api/projects/${projectId}`, "DELETE");
      handleClose();
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSave() {
    const url = mode === "add" ? "/api/projects" : `/api/projects/${projectId}`;
    const method = mode === "add" ? "POST" : "PUT";

    try {
      setIsLoading(true);
      await request(url, method, { project });
      handleClose();
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleClose() {
    setError("");
    onClose();
  }

  if (mode === "delete") {
    return (
      <Modal size="mini" open={isOpen} onClose={handleClose}>
        <Message error hidden={error === ""} attached="top">
          {error}
        </Message>
        <Modal.Header>Are you sure you want to delete this project?</Modal.Header>
        <Modal.Actions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="red" onClick={handleDelete} loading={isLoading}>
            Delete
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }

  return (
    <Modal size="mini" open={isOpen} onClose={handleClose}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Content>
        <Message error hidden={error === ""}>
          {error}
        </Message>
        <Form>
          <Form.Field>
            <label>Name</label>
            <input
              placeholder="Name"
              value={project.name}
              onChange={e => setProject({ ...project, name: e.target.value })}
            />
          </Form.Field>
          <Form.Field>
            <label>Timezone</label>
            <TimezoneDropdown
              value={project.timezone}
              onChange={(e, d) => {
                if (typeof d.value === "string") setProject({ ...project, timezone: d.value });
              }}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" onClick={handleSave}>
          Save
        </Button>
      </Modal.Actions>
    </Modal>
  );
}
