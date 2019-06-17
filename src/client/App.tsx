import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import PageViewContainer from "./pages/PageViewContainer";

export default function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={PageViewContainer} />
      <Route path="/login/" component={PageViewContainer} />
    </BrowserRouter>
  );
}
