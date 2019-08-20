import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import ChangePasswordPage from "./pages/login/ChangePasswordPage";
import PageViewMetricsPage from "./pages/metrics/PageViewMetricsPage";
import SettingsPage from "./pages/settings/SettingsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Route path="/login" component={LoginPage} />
      <PrivateRoute path="/password" component={ChangePasswordPage} />
      <PrivateRoute path="/" exact component={PageViewMetricsPage} />
      <PrivateRoute path="/settings" component={SettingsPage} />
    </BrowserRouter>
  );
}

function PrivateRoute({ component: Component, ...rest }: any) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return <Route {...rest} render={props => (isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />)} />;
}
