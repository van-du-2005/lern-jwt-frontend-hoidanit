import "./Register.scss";

import { useHistory } from "react-router-dom";

const Register = () => {
  let history = useHistory();

  const handlerLogin = () => {
    history.push("/login");
  };
  return (
    <div className="Register-container ">
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
            <div>
              <label for="email" class="form-label">
                Email:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Email address"
              />
            </div>

            <div>
              <label for="phone" class="form-label">
                Phone number:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Phone number"
              />
            </div>

            <div>
              <label for="username" class="form-label">
                Username:
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
              />
            </div>

            <div>
              <label for="password" class="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>

            <div>
              <label for="reEnterPassword" class="form-label">
                Re-enter-Password:
              </label>
              <input
                type="password"
                className="form-control"
                placeholder="Re-enter-Password"
              />
            </div>

            <button className="btn btn-primary">Register</button>
            <hr className="mt-0" />
            <div className="text-center">
              <button
                className="btn btn-success"
                onClick={() => handlerLogin()}
              >
                Already have an account? Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
