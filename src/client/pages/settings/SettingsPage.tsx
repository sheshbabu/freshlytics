import React from "react";
import { Container, Divider, Tab, Menu, Icon } from "semantic-ui-react";
import Navbar from "../../components/Navbar";
import PageHeader from "../../components/PageHeader";
import ProjectsTab from "./projects/ProjectsTab";
import UsersTab from "./users/UsersTab";
import CreditsSection from "./credits/CreditsSection";

export default function SettingsPage() {
  const panes = [
    {
      menuItem: (
        <Menu.Item key="1">
          <Icon name="cube" />
          Projects
        </Menu.Item>
      ),
      render: function render() {
        return (
          <Tab.Pane>
            <ProjectsTab />
          </Tab.Pane>
        );
      }
    },
    {
      menuItem: (
        <Menu.Item key="2">
          <Icon name="user" />
          Users
        </Menu.Item>
      ),
      render: function render() {
        return (
          <Tab.Pane>
            <UsersTab />
          </Tab.Pane>
        );
      }
    }
  ];

  return (
    <Container text>
      <Navbar />
      <Divider hidden />
      <PageHeader name="Settings" />
      <Divider hidden />
      <Tab panes={panes} />
      <Divider hidden />
      <CreditsSection />
      <Divider hidden />
    </Container>
  );
}
