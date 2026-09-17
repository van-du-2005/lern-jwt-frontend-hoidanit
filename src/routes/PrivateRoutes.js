import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const PrivateRoutes = (props) => {
  // const history = useHistory();
  const userContext = useAuth().user;

  // useEffect(() => {
  //   const userSession = sessionStorage.getItem("user");
  //   if (!userSession) {
  //     history.push("/login");
  //     window.location.reload();
  //   }
  // }, []);

  if (userContext && userContext.isAuthenticated) {
    return (
      <div className="private-route-container">
        <Switch>
          <Route path={props.path} component={props.component} />
        </Switch>
      </div>
    );
  } else {
    return <Redirect to="/login" />;
  }
};

export default PrivateRoutes;
