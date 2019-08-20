import React from "react";
import { Container, Divider } from "semantic-ui-react";
import Navbar from "../../components/Navbar";
import PageHeader from "../../components/PageHeader";
import request from "../../libs/request";
import styles from "./LoginPage.css";

export default function SettingsPage() {
  return (
    <Container text>
      <Navbar />
      <Divider hidden />
      <PageHeader name="Settings" />
    </Container>
  );
}
