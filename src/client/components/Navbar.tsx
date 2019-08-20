import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styles from "./Navbar.css";

export default function Navbar() {
  return (
    <Menu attached="bottom">
      <Menu.Item header>
        <Link to="/" className={styles.header}>
          freshlytics
        </Link>
      </Menu.Item>
      <Menu.Item position="right">
        <Link to="/settings" className={styles.link}>
          Settings
        </Link>
      </Menu.Item>
    </Menu>
  );
}
