import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { fetchData } from "../../services/groupService";
import { createUser, updateUser } from "../../services/userService";

const ModalUser = (props) => {
  const objectUserDataDefault = {
    id: -1,
    email: "",
    phone: "",
    username: "",
    password: "",
    address: "",
    gender: "Male",
    group: "",
  };

  const objectValidInput = {
    email: true,
    phone: true,
    password: true,
    group: true,
  };
  const userDataEditConvert = {
    id: props.userDataEdit.id || -1,
    email: props.userDataEdit.email || "",
    phone: props.userDataEdit.phone || "",
    username: props.userDataEdit.username || "",
    password: props.userDataEdit.password || "",
    address: props.userDataEdit.address || "",
    gender: props.userDataEdit.sex || "Male",
    group: (props.userDataEdit.Group && props.userDataEdit.Group.id) || -1,
  };

  const [validInput, setValidInput] = useState(objectValidInput);

  const [userData, setUserData] = useState(objectUserDataDefault);

  const [groupData, setGroupData] = useState([]);

  const [disableInput, setDisableInput] = useState("");
  const [defaultGender, setDefaultGender] = useState(1);

  useEffect(() => {
    fetchGroupData();
  }, []);

  useEffect(() => {
    if (props.handleShow === true) {
      if (props.title === "Edit") {
        setUserData(userDataEditConvert);
        setDisableInput("disabled");
      } else {
        setUserData(objectUserDataDefault);
      }
      //set giá trị hiển thị group.);
      defaultGroupValue(props.title);
    } else {
      setUserData(objectUserDataDefault);
      setValidInput(objectValidInput);
      setDisableInput("");
    }
  }, [props.handleShow]);

  const fetchGroupData = async () => {
    const groups = await fetchData();
    if (groups && +groups.EC === 0) {
      setGroupData(groups.DT);
    }
    if (groups && +groups.EC !== 0) {
      toast.error(groups.EM);
    }
  };

  const handleChangeInput = (e, changeName) => {
    setUserData((pre) => {
      return { ...pre, [changeName]: e.target.value };
    });
  };

  const handleSaveUser = async () => {
    if (checkValidateInput(props.title)) {
      let res =
        props.title === "Create"
          ? await createUser({
              email: userData.email,
              username: userData.username,
              phone: userData.phone,
              password: userData.password,
              address: userData.address,
              gender: userData.gender,
              group: userData.group,
            })
          : await updateUser(userData);

      if (res && +res.EC === 0) {
        toast.success(res.EM);
        setUserData(objectUserDataDefault);
        props.handleClose();
      }

      if (res && +res.EC !== 0) {
        setValidInput((prev) => ({ ...prev, [res.DT]: false }));
        toast.error(res.EM);
      }
    }
  };

  const checkValidateInput = (title) => {
    let arrInput = [];
    if (title === "Create") {
      arrInput = ["email", "phone", "password", "group"];
    } else {
      arrInput = ["group"];
    }
    let isValid = true;
    for (let i = 0; i < arrInput.length; i++) {
      if (!userData[arrInput[i]]) {
        toast.error(`Missing parameter: ${arrInput[i]}`);
        setValidInput((prev) => ({ ...prev, [arrInput[i]]: false }));
        isValid = false;
        break;
      }
    }
    return isValid;
  };

  const defaultGroupValue = (title) => {
    if (title === "Edit") {
      setUserData((prevData) => {
        return {
          ...prevData,
          group:
            props.userDataEdit.Group && props.userDataEdit.Group.id
              ? props.userDataEdit.Group.id
              : groupData && groupData.length > 0
                ? groupData[0].id
                : -1,
        };
      });
    }
    if (title === "Create") {
      setUserData((prevData) => {
        return {
          ...prevData,
          group: groupData && groupData.length > 0 ? groupData[0].id : -1,
        };
      });
    }
  };

  const handleDefaultGender = (gender) => {
    if (gender === "Male") {
      return 1;
    } else if (gender === "Female") {
      return 2;
    } else {
      return 3;
    }
  };

  return (
    <>
      <Modal
        show={props.handleShow}
        onHide={props.handleClose}
        size="lg"
        className="modal-user"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="content-body row">
            <div className=" col-12 col-sm-6">
              <label className="form-label">
                Email address (<span className="text-danger">*</span>):
              </label>
              <input
                type="email"
                className={
                  validInput.email ? "form-control " : "form-control is-invalid"
                }
                aria-describedby="email"
                value={userData.email}
                onChange={(e) => handleChangeInput(e, "email")}
                disabled={props.title === "Edit" ? true : false}
              />
            </div>

            <div className=" col-12 col-sm-6 ">
              <label className="form-label">
                Phone Number (<span className="text-danger">*</span>):
              </label>
              <input
                type="tel"
                className={
                  validInput.phone ? "form-control" : "form-control is-invalid"
                }
                aria-describedby="phone"
                value={userData.phone}
                onChange={(e) => handleChangeInput(e, "phone")}
                disabled={props.title === "Edit" ? true : false}
              />
            </div>

            <div className=" col-12 col-sm-6 ">
              <label className="form-label">User Name:</label>
              <input
                type="text"
                className="form-control"
                aria-describedby="Username"
                value={userData.username}
                onChange={(e) => handleChangeInput(e, "username")}
              />
            </div>

            <div className="col-12 col-sm-6 ">
              {props.title === "Create" && (
                <>
                  <label className="form-label">
                    Password (<span className="text-danger">*</span>):
                  </label>
                  <input
                    type="password"
                    className={
                      validInput.password
                        ? "form-control"
                        : "form-control is-invalid"
                    }
                    aria-describedby="password"
                    value={userData.password}
                    onChange={(e) => handleChangeInput(e, "password")}
                  />
                </>
              )}
            </div>

            <div className=" col-12 ">
              <label className="form-label">Address:</label>
              <input
                type="text"
                className="form-control"
                aria-describedby="address"
                value={userData.address}
                onChange={(e) => handleChangeInput(e, "address")}
              />
            </div>

            <div className=" col-12 col-sm-6 ">
              <label className="form-label">Gender:</label>
              <select
                value={userData.gender || "Male"}
                className="form-select form-select-md"
                aria-label="Gender"
                onChange={(e) => handleChangeInput(e, "gender")}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className=" col-12 col-sm-6 ">
              <label className="form-label">
                Group (<span className="text-danger">*</span>):
              </label>
              <select
                value={userData.group || -1}
                className={
                  validInput.group
                    ? " form-select form-select-md form-select-group"
                    : " form-select form-select-md form-select-group is-invalid"
                }
                aria-label="Group"
                onChange={(e) => handleChangeInput(e, "group")}
              >
                {groupData && groupData.length > 0 ? (
                  groupData.map((group, index) => {
                    return (
                      <option key={`group-${group.id}`} value={group.id}>
                        {group.name}
                      </option>
                    );
                  })
                ) : (
                  <option value="-1">Lỗi khi lấy group data</option>
                )}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.handleClose}>Close</Button>
          <Button
            onClick={() => {
              handleSaveUser();
            }}
          >
            {props.title === "Create" ? "Create User" : "Save Changes"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalUser;
