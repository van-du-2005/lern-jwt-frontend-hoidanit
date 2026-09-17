import "./Login.scss";

import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { postUserLogin } from "../../services/userService";
import { useAuth } from "../../context/AuthContext";

const Login = (props) => {
  const loginContext = useAuth().login;
  const userContext = useAuth().user;

  let history = useHistory();
  const [valueLogin, setValueLogin] = useState("");
  const [password, setPassword] = useState("");
  const objectIsValid = {
    valueLogin: true,
    password: true,
  };

  const [isValid, setIsValid] = useState(objectIsValid);

  const handlerCreateAccount = () => {
    history.push("/register");
  };

  const handlerLogin = async () => {
    setIsValid(objectIsValid);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!valueLogin) {
      toast.error("Email or phone number is required");
      setIsValid({ ...objectIsValid, valueLogin: false });
      return;
    }
    if (!emailRegex.test(valueLogin) && !phoneRegex.test(valueLogin)) {
      toast.error("Email or phone number is invalid");
      setIsValid({ ...objectIsValid, valueLogin: false });
      return;
    }
    if (!password) {
      toast.error("Password is required");
      setIsValid({ ...objectIsValid, password: false });
      return;
    }
    if (password && password.length < 4) {
      toast.error("Password must have at least 4 letters");
      setIsValid({ ...objectIsValid, password: false });
      return;
    }

    const userLogin = await postUserLogin(valueLogin, password);

    if (userLogin && +userLogin.EC === 0) {
      const email = userLogin.DT.email;
      const userName = userLogin.DT.username;
      const groupWithRoles = userLogin.DT.groupRole;

      const token = userLogin.DT.JWT;

      const data = {
        isAuthenticated: true,
        token: token,
        account: {
          email: email,
          userName: userName,
          groupWithRoles: groupWithRoles,
        },
      };
      sessionStorage.setItem("jwt", token);
      loginContext(data);

      history.push("/users");
      // window.location.reload();
      return;
    }

    if (userLogin && +userLogin.EC !== 0) {
      toast.error(userLogin.EM);
      return;
    }
  };

  const handlerPressEnter = (event) => {
    if (event.keyCode === 13 && event.key === "Enter") {
      handlerLogin();
    }
  };

  useEffect(() => {
    if (userContext && userContext.isAuthenticated) {
      history.push("/");
    }
  }, []);

  return (
    <div className="login-container ">
      <div className="container">
        <div className="row mx-2 mx-sm-2">
          <div className="left-container mt-4 col-sm-7 d-none d-sm-block d-flex flex-column">
            <div className="brand">Văn Dũ</div>
            <div className="description">
              Văn Dũ helps you connect with the people in your life.
            </div>
          </div>
          <div className="right-container col-12 col-sm-5 d-flex flex-column p-3 gap-3">
            <div className="brand d-sm-none text-center">Văn Dũ</div>
            <input
              type="text"
              className={
                isValid.valueLogin ? "form-control" : "form-control is-invalid"
              }
              placeholder="Email address or phone number"
              value={valueLogin}
              onChange={(e) => {
                setValueLogin(e.target.value);
              }}
            />
            <input
              type="password"
              className={
                isValid.password ? "form-control" : "form-control is-invalid"
              }
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onKeyDown={(event) => {
                handlerPressEnter(event);
              }}
            />
            <button className="btn btn-primary" onClick={handlerLogin}>
              Log in
            </button>
            <span className="text-center text-primary">
              <a className="forgotten-password" href="#">
                Forgotten password?
              </a>
            </span>
            <hr className="mt-0" />
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={() => handlerCreateAccount()}
              >
                Create New Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
