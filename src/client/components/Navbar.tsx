import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import request from "../libs/request";
import styles from "./Navbar.css";

export default function Navbar() {
  function handleLogout() {
    request("/api/logout");
  }

  return (
    <Menu attached="bottom">
      <Menu.Item header>
        <Link to="/" className={styles.header}>
          freshlytics
        </Link>
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>
          <Link to="/settings" className={styles.link}>
            Settings
          </Link>
        </Menu.Item>
        <Menu.Item>
          <span className={styles.link} onClick={handleLogout}>
            Logout
          </span>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
