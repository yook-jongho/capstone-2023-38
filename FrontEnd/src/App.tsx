import React from "react";
import { createGlobalStyle } from "styled-components";
import Login from "./login/loginPage";
import backImg from "./img/backImg.jpg";
import { Route, Routes } from "react-router-dom";
import SignUp from "./signup/signup";

const GlobalStyle = createGlobalStyle`
body {
  background-image: url(${backImg});
}`;

function App() {
  return (
    <>
      <GlobalStyle />
      {/* <Login></Login> */}
      <Routes>
        <Route path="/" Component={Login} />
        <Route path="/signUp" Component={SignUp} />
      </Routes>
    </>
  );
}

export default App;
