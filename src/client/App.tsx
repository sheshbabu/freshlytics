import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import ChangePasswordPage from "./pages/login/ChangePasswordPage";
import PageViewMetricsPage from "./pages/metrics/PageViewMetricsPage";
import SettingsPage from "./pages/settings/SettingsPage";
import { User } from "./types/User.type";

type Context = {
  user: User | null;
  setUser: Function;
};

export const AppContext = React.createContext<Context>({ user: null, setUser: () => {} });

export default function App() {
  const [user, setUser] = React.useState<User | null>(null);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/password" component={ChangePasswordPage} />
        <PrivateRoute path="/" exact component={PageViewMetricsPage} />
        <PrivateRoute path="/settings" component={SettingsPage} />
      </BrowserRouter>
    </AppContext.Provider>
  );
}

function PrivateRoute({ component: Component, ...rest }: any) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return <Route {...rest} render={props => (isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />)} />;
}
