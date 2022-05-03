import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";

import { Dashboard } from "./pages/dashboard/Dashboard";
import { Create } from "./pages/Create/Create";
import { Login } from "./pages/login/Login";
import { Signup } from "./pages/signup/Signup";
import { Project } from "./pages/project/Project";

import "./App.css";
import { Navbar } from "./components/Navbar";
import { Sidebar } from "./components/Sidebar";

function App() {
  const { authIsReady, user } = useAuth();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Sidebar />
          <div className="container">
            <Navbar />
            <Switch>
              <Route path={"/"} exact>
                <Dashboard />
              </Route>
              <Route path={"/create"}>
                <Create />
              </Route>
              <Route path={"/login"}>
                <Login />
              </Route>
              <Route path={"/signup"}>
                {!user && <Signup />}
                {user && <Redirect to={'/'} />}
              </Route>
              <Route path={"/project/:id"}>
                <Project />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
