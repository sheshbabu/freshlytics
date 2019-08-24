import React from "react";
import { Container, Divider, Tab, Menu, Icon } from "semantic-ui-react";
import { AppContext } from "../../App";
import Navbar from "../../components/Navbar";
import PageHeader from "../../components/PageHeader";
import ProjectsTab from "./projects/ProjectsTab";
import UsersTab from "./users/UsersTab";
import ProfileSection from "./profile/ProfileSection";
import CreditsSection from "./credits/CreditsSection";

export default function SettingsPage() {
  return (
    <Container text>
      <Navbar />
      <Divider hidden />
      <PageHeader name="Settings" />
      <Divider hidden />
      <AdminTab />
      <ProfileSection />
      <Divider hidden />
      <CreditsSection />
      <Divider hidden />
    </Container>
  );
}

function AdminTab() {
  const { user } = React.useContext(AppContext);

  if (user === null) {
    return null;
  }

  if (!user.is_admin) {
    return null;
  }

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
    <>
      <Tab panes={panes} />
      <Divider hidden />
    </>
  );
}
