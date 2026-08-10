import "./Login.scss";

import { useHistory } from "react-router-dom";

const Login = () => {
  let history = useHistory();

  const handlerCreateAccount = () => {
    history.push("/register");
  };
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
              className="form-control"
              placeholder="Email address or phone number"
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
            />
            <button className="btn btn-primary">Log in</button>
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
