import React, { useCallback } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import logoImg from "../img/logo2.png";
import { useNavigate } from "react-router-dom";

const Navigationbar = styled.div`
  display: flex;
  align-items: flex-start;
  max-width: 100%;
  margin: 0 auto;
  background-color: black;

  .logo {
    max-width: 250px;
    transition: max-width 0.3s ease-in-out;

    &:hover {
      max-width: 270px;
    }
  }

  .menu {
    margin: 2rem 2rem 2rem auto;
    font-size: 1.3rem;
    font-weight: bold;
    color: white;
    cursor: pointer;
    transition: font-size 0.3s ease-in-out;

    &:hover {
      font-size: 1.6rem;
      border-bottom: 1px solid white;
      padding-bottom: 2px;
    }
  }
`;

function BaseHeader() {
  const navigator = useNavigate();

  const moveLoginPage = useCallback(() => {
    navigator("/login");
  }, [navigator]);

  const moveMainPage = useCallback(() => {
    navigator("/main");
  }, [navigator]);
  return (
    <Navigationbar>
      <img src={logoImg} className="logo" onClick={moveMainPage} />
      <div className="menu" onClick={moveLoginPage}>
        <FontAwesomeIcon
          icon={faCircleUser}
          size="xl"
          style={{ color: "#ffffff" }}
        />
        <span> 로그인 </span>
      </div>
    </Navigationbar>
  );
}

export default BaseHeader;
