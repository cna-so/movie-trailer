import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BiSearchAlt } from "react-icons/bi";
import { useDispatch } from "react-redux";

import { setSignOutState } from "features/userSlice";
import { useHistory } from "react-router-dom";
import { auth } from "firebaseConfig";

const Nav = () => {
  const [showHandler, setShowHandler] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const logoutHandler = () => {
    auth
      .signOut()
      .then(() => {
        dispatch(setSignOutState());
        history.push("/");
      })
      .catch((err) => alert(err.message));
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShowHandler(true);
      } else {
        setShowHandler(false);
      }
    });
    // return () => {
    //   window.removeEventListener("scroll");
    // };
  });
  return (
    <Navigation
      style={{
        transition: "background 0.5s ease",
        background: showHandler && "#040714",
      }}
    >
      <Logo>
        <img src="/images/logo.svg" alt="logo" />
      </Logo>
      <NavMenu>
        <ul>
          <li>Home</li>
          <li>Movie</li>
          <li>Series</li>
          <li>My List</li>
          <li>
            <BiSearchAlt />
          </li>
          <li>
            <Logout onClick={logoutHandler}>Logout</Logout>
          </li>
        </ul>
      </NavMenu>
      <LogoutM onClick={logoutHandler}>Logout</LogoutM>
    </Navigation>
  );
};

const Navigation = styled.nav`
  z-index: 10;
  position: fixed;
  top: 0px;
  left: 0px;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5rem 6rem;

  @media screen and (max-width: 768px) {
    padding: 0.5rem 0.5rem;
  }
`;
const Logo = styled.div`
  padding: 0;
  width: 80px;
  max-height: 70px;
  display: inline-block;
  img {
    display: block;
    width: 100%;
  }
`;
const NavMenu = styled.div`
  ul {
    display: flex;
    align-items: center;
  }
  li {
    cursor: pointer;
    list-style: none;
    margin: 0 1rem;
    font-size: 1.2rem;
    font-weight: 500;
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const Logout = styled.button`
  background: #ff0d1f;
  padding: 0.8rem 2.5rem;
  border-radius: 1rem;
  cursor: pointer;
`;
const LogoutM = styled.button`
  display: none;
  background: #ff0d1f;
  padding: 0.8rem 2.5rem;
  border-radius: 1rem;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    display: inline-block;
  }
`;

export default Nav;
