import React from "react";
import { Button, Table } from "semantic-ui-react";
import useRequest from "../../../components/useRequest";
import Spinner from "../../../components/Spinner";
import ProjectModal, { Mode } from "./ProjectModal";
import ProjectSetupModal from "./ProjectSetupModal";
import { Project } from "../../../types/Project.type";
import styles from "../SettingsPage.css";

export default function ProjectsTab() {
  const [projects, isLoading, refetch] = useRequest<Project[]>("/api/projects");
  const [modalMode, setModalMode] = React.useState<Mode>("add");
  const [modalProjectId, setModalProjectId] = React.useState<string>("");
  const [isProjectModalOpen, setIsProjectModalOpen] = React.useState<boolean>(false);
  const [isProjectSetupModalOpen, setIsProjectSetupModalOpen] = React.useState<boolean>(false);

  if (isLoading) {
    return (
      <div className={styles.tab_container}>
        <Spinner />
      </div>
    );
  }

  if (projects === null) {
    return null;
  }

  function handleAddClick() {
    setModalMode("add");
    setIsProjectModalOpen(true);
  }

  function handleSetupClick(projectId: string) {
    setModalProjectId(projectId);
    setIsProjectSetupModalOpen(true);
  }

  function handleEditClick(projectId: string) {
    setModalMode("edit");
    setModalProjectId(projectId);
    setIsProjectModalOpen(true);
  }

  function handleDeleteClick(projectId: string) {
    setModalMode("delete");
    setModalProjectId(projectId);
    setIsProjectModalOpen(true);
  }

  function handleModalClose() {
    setModalProjectId("");
    setIsProjectModalOpen(false);
    setIsProjectSetupModalOpen(false);
    refetch();
  }

  return (
    <div className={styles.tab_container}>
      <div className={styles.button_row}>
        <Button color="green" onClick={handleAddClick}>
          Add Project
        </Button>
      </div>
      <ProjectsTable
        projects={projects}
        onSetupClick={handleSetupClick}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
      <ProjectModal
        isOpen={isProjectModalOpen}
        mode={modalMode}
        projectId={modalProjectId}
        onClose={handleModalClose}
      />
      <ProjectSetupModal isOpen={isProjectSetupModalOpen} projectId={modalProjectId} onClose={handleModalClose} />
    </div>
  );
}

type ProjectsTableProps = {
  projects: Project[];
  onSetupClick: (projectId: string) => void;
  onEditClick: (projectId: string) => void;
  onDeleteClick: (projectId: string) => void;
};

function ProjectsTable(props: ProjectsTableProps) {
  const rows = props.projects.map(project => <ProjectsTableRow key={project.id} project={project} {...props} />);

  return (
    <Table celled striped singleLine compact size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={4}>Name</Table.HeaderCell>
          <Table.HeaderCell width={2}>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>{rows}</Table.Body>
    </Table>
  );
}

type ProjectsTableRowProps = {
  project: Project;
  onSetupClick: (projectId: string) => void;
  onEditClick: (projectId: string) => void;
  onDeleteClick: (projectId: string) => void;
};

function ProjectsTableRow(props: ProjectsTableRowProps) {
  return (
    <Table.Row>
      <Table.Cell>{props.project.name}</Table.Cell>
      <Table.Cell>
        <Button size="mini" basic onClick={() => props.onSetupClick(props.project.id)}>
          Setup Instructions
        </Button>
        <Button size="mini" basic onClick={() => props.onEditClick(props.project.id)}>
          Edit
        </Button>
        <Button size="mini" basic onClick={() => props.onDeleteClick(props.project.id)}>
          Delete
        </Button>
      </Table.Cell>
    </Table.Row>
  );
}
