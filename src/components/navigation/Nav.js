import React from "react";
import "./Nav.scss";

import { NavLink } from "react-router-dom";

const Nav = (props) => {
  return (
    <div className="top-nav">
      <ul>
        <li>
          <NavLink to="/" exact>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/news">News</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
