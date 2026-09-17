import "./Register.scss";

import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import { postUser } from "../../services/userService";

const Register = (props) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const objectIsValid = {
    email: true,
    phone: true,
    pass: true,
    confirmPass: true,
  };
  const [isInputValid, setIsInputValid] = useState(objectIsValid);

  const isValidInput = () => {
    setIsInputValid(objectIsValid);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!email) {
      setIsInputValid({ ...objectIsValid, email: false });
      toast.error("Email is required");
      return false;
    }
    if (!emailRegex.test(email)) {
      setIsInputValid({ ...objectIsValid, email: false });
      toast.error("Email is invalid");
      return false;
    }
    if (!phone) {
      setIsInputValid({ ...objectIsValid, phone: false });
      toast.error("Phone number is required");
      return false;
    }
    if (!phoneRegex.test(phone)) {
      setIsInputValid({ ...objectIsValid, phone: false });
      toast.error("Phone number is invalid");
      return false;
    }
    if (!password) {
      setIsInputValid({ ...objectIsValid, pass: false });
      toast.error("Password is required");
      return false;
    }
    if (password !== confirmPassword) {
      setIsInputValid({ ...objectIsValid, confirmPass: false });
      toast.error("Passwords and Confirm Passwords is not the same");
      return false;
    }

    return true;
  };

  const handlerRegister = async () => {
    const resultValid = isValidInput();
    if (!resultValid) return;

    const userData = await postUser(
      email,
      username,
      phone,
      password,
      confirmPassword,
    );
    if (+userData.EC === 0) {
      toast.success(userData.EM);
      history.push("/login");
    } else {
      toast.error(userData.EM);
    }
    return;
  };

  const handlerLogin = () => {
    history.push("/login");
  };

  useEffect(() => {});
  return (
    <div className="register-container ">
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
              <label className="form-label">Email:</label>
              <input
                type="text"
                className={
                  isInputValid.email
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label">Phone number:</label>
              <input
                type="text"
                className={
                  isInputValid.phone
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label">Username:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label">Password:</label>
              <input
                type="password"
                className={
                  isInputValid.pass ? "form-control" : "form-control is-invalid"
                }
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label">Re-enter-Password:</label>
              <input
                type="password"
                className={
                  isInputValid.confirmPass
                    ? "form-control"
                    : "form-control is-invalid"
                }
                placeholder="Re-enter-Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              onClick={() => handlerRegister()}
              className="btn btn-primary"
            >
              Register
            </button>
            <hr className="mt-0" />
            <div className="text-center">
              <button
                type="submit"
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
