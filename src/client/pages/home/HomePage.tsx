import React from "react";
import { Container, Divider } from "semantic-ui-react";
import useRequest from "../../components/useRequest";
import Navbar from "../../components/Navbar";
import Spinner from "../../components/Spinner";
import Welcome from "../../components/Welcome";
import PageViewMetricsPage from "../metrics/PageViewMetricsPage";
import { Project } from "../../types/Project.type";

export default function HomePage() {
  const [projects, isLoading] = useRequest<Project[]>("/api/projects");

  if (isLoading) {
    return <Spinner isFullHeight />;
  }

  if (projects === null || projects.length === 0) {
    return (
      <Container text>
        <Navbar />
        <Welcome />
      </Container>
    );
  }

  return (
    <Container text>
      <Navbar />
      <Divider hidden />
      <PageViewMetricsPage projects={projects} />
    </Container>
  );
}
