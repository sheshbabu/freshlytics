import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import PageViewContainer from "./pages/PageViewContainer";
import LoginContainer from "./pages/LoginContainer";
import ChangePasswordContainer from "./pages/ChangePasswordContainer";

export default function App() {
  return (
    <BrowserRouter>
      <PrivateRoute path="/" exact component={PageViewContainer} />
      <Route path="/login" component={LoginContainer} />
      <PrivateRoute path="/password" component={ChangePasswordContainer} />
    </BrowserRouter>
  );
}

function PrivateRoute({ component: Component, ...rest }: any) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return <Route {...rest} render={props => (isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />)} />;
}
