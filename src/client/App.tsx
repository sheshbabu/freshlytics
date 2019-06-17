import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PageViewContainer from "./pages/PageViewContainer";
import LoginContainer from "./pages/LoginContainer";
import ChangePasswordContainer from "./pages/ChangePasswordContainer";

export default function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={PageViewContainer} />
      <Route path="/login" component={LoginContainer} />
      <Route path="/password" component={ChangePasswordContainer} />
    </BrowserRouter>
  );
}
