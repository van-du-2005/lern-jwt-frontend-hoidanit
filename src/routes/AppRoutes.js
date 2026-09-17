import { Route, Switch } from "react-router-dom";

import PrivateRoutes from "./PrivateRoutes";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import Users from "../components/users/Users";
import Role from "../components/role/Role";
import GroupRole from "../components/GroupRole/GroupRole";

const AppRoutes = (props) => {
  return (
    <div className="app-routes-container">
      <Switch>
        {/* <Route path="/project">project page</Route>
      <Route path="/users">
        <Users />
      </Route>
       */}
        <PrivateRoutes path="/users" component={Users} />
        <PrivateRoutes path="/role" component={Role} />
        <PrivateRoutes path="/group-role" component={GroupRole} />

        <Route path="/register">
          <Register />
        </Route>

        <Route path="/login">
          <Login />
        </Route>
        <Route path="/" exact>
          home
        </Route>
        <Route path="*">not found 404</Route>
      </Switch>
    </div>
  );
};

export default AppRoutes;
