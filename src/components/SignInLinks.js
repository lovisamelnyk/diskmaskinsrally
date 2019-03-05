import React from "react";
import { NavLink } from "react-router-dom";

const SignInLinks = () => {
  return (
    <ul className="right">
      <li>
        <NavLink to="/newgame">New game</NavLink>
      </li>
      <li>
        <NavLink to="/">Log Out</NavLink>
      </li>
      <li>
        <NavLink to="/" className="btn btn-floating pink lighten-1">
          LM
        </NavLink>
      </li>
    </ul>
  );
};
export default SignInLinks;
