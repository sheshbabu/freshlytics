import React from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import request from "./libs/request";
import LoginPage from "./pages/login/LoginPage";
import ChangePasswordPage from "./pages/login/ChangePasswordPage";
import HomePage from "./pages/home/HomePage";
import SettingsPage from "./pages/settings/SettingsPage";
import { User } from "./types/User.type";

type Context = {
  user: User | null;
  setUser: Function;
};

export const AppContext = React.createContext<Context>({
  user: null,
  setUser: () => {}
});

export default function App() {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    if (!isAuthenticated) {
      return;
    }

    request("/api/user").then((response: User) => setUser(response));
  }, []);

  return (
    <AppContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Route path="/login" component={LoginPage} />
        <PrivateRoute path="/password" component={ChangePasswordPage} />
        <PrivateRoute path="/" exact component={HomePage} />
        <PrivateRoute path="/settings" component={SettingsPage} />
      </BrowserRouter>
    </AppContext.Provider>
  );
}

function PrivateRoute({ component: Component, ...rest }: any) {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return <Route {...rest} render={props => (isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />)} />;
}
