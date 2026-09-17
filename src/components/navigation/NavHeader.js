import React from "react";
import "./Nav.scss";

import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { toast } from "react-toastify";

import { useAuth } from "../../context/AuthContext";
import logo from "../../logo.svg";
import { postUserLogout } from "../../services/userService";

const NavHeader = (props) => {
  let location = useLocation();
  // const [isShow, setIsShow] = useState(false);
  let userContext = useAuth().user;
  let logoutContext = useAuth().logout;

  // useEffect(() => {
  //   const url = location.pathname;

  //   if (url === "/login" || url === "/register") {
  //     setIsShow(false);
  //   } else {
  //     setIsShow(true);
  //   }
  // }, []);

  const handlerLogout = async () => {
    console.log(">>> me logout");
    let res = await postUserLogout();
    if (res && res.EC === 0) {
      logoutContext();
      toast.success("Logout successfully");
    } else {
      toast.error(res?.EM || "Logout failed");
    }
  };

  if (
    (userContext && userContext.isAuthenticated) ||
    location.pathname === "/"
  ) {
    return (
      <>
        {/* <div className="top-nav">
          <ul>
            <li>
              <NavLink to="/" exact>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/users">Users</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>
        </div> */}
        <div className="nav-header">
          <Navbar bg="header" expand="lg" className="bg-body-tertiary">
            <Container>
              <Navbar.Brand href="#home">
                <img
                  alt=""
                  src={logo}
                  width="30"
                  height="30"
                  className="d-inline-block align-top nav-logo"
                />
                <span className="brand-name"> React Bootstrap</span>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  {/* <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#link">Users</Nav.Link>
                  <Nav.Link href="#link">Projects</Nav.Link>
                  <Nav.Link href="#link">About</Nav.Link> */}

                  <NavLink className="nav-link" to="/" exact>
                    Home
                  </NavLink>
                  <NavLink className="nav-link" to="/users">
                    Users
                  </NavLink>
                  <NavLink className="nav-link" to="/role">
                    Roles
                  </NavLink>
                  <NavLink className="nav-link" to="/group-role">
                    Group Roles
                  </NavLink>
                  <NavLink className="nav-link" to="/project">
                    Projects
                  </NavLink>
                  <NavLink className="nav-link" to="/about">
                    About
                  </NavLink>
                </Nav>

                {userContext && userContext.isAuthenticated ? (
                  <Nav>
                    <Nav.Item className="nav-link" href="#deets">
                      Welcome {userContext.account.userName}!
                    </Nav.Item>
                    <NavDropdown title="Settings" id="basic-nav-dropdown">
                      <NavDropdown.Item href="#action/3.1">
                        Change Password
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item>
                        <span
                          onClick={() => {
                            handlerLogout();
                          }}
                        >
                          Logout
                        </span>
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </Navbar.Collapse>
            </Container>
          </Navbar>
        </div>
      </>
    );
  } else {
    return <></>;
  }
};
export default NavHeader;
