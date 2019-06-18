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

function PrivateRoute(props: any) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  if (isAuthenticated) {
    return <Route {...props} />;
  } else {
    return <Redirect to={{ pathname: "/login" }} />;
  }
}
