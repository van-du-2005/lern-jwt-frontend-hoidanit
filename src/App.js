import "./App.scss";
import Nav from "./components/navigation/Nav";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./components/login/Login";
import Register from "./components/register/Register";

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* <Nav /> */}
        <Switch>
          <Route path="/news">news</Route>
          <Route path="/about">about</Route>
          <Route path="/contact">contact</Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/" exact>
            home
          </Route>

          <Route path="*">not found 404</Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
