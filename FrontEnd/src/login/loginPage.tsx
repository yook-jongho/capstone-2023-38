import React, { useCallback, useRef, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Button from "../components/button";

const MainBox = styled.div`
  width: 30%;
  height: 70%;

  position: relative;
  border-radius: 1%;
  background-color: rgba(0, 0, 0, 0.8);

  margin: 0 auto;
  margin-top: 4rem;
  padding: 5rem;

  display: flex;
  flex-direction: column;

  .login {
    color: #fff;
    font-size: 2.5rem;
    margin-bottom: 2rem;
  }

  .button {
    margin-top: 2rem;
  }

  .notuser {
    margin-top: 1rem;
    color: #fff;
  }
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 1%;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 16px;
  box-sizing: border-box;
  margin-top: 1rem;
`;

function Login() {
  const [userInputs, setUserLogin] = useState({
    email: "",
    password: "",
  });
  const { email, password } = userInputs;
  const userInput = useRef<HTMLInputElement>(null);

  //아이디&비밀번호 입력값 받아오기
  const onChange = useCallback(
    (e: any) => {
      const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
      setUserLogin({
        ...userInputs, // 기존의 input 객체를 복사한 뒤
        [name]: value, // name 키를 가진 값을 value 로 설정
      });
    },
    [userInputs]
  );

  //로그인 실패 시, 입력칸 초기화 및 포커스
  const onRset = useCallback(() => {
    setUserLogin({
      email: "",
      password: "",
    });
    if (userInput.current) userInput.current.focus();
  }, []);

  //mock-up 데이터
  const [users, setUsers] = useState([
    {
      id: "1",
      email: "test@test.com",
      password: "test1234",
    },
    {
      id: "2",
      email: "test2@test.com",
      password: "test1234",
    },
  ]);

  //아이디&비밀번호 확인
  const onCheck = useCallback(() => {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      console.log("로그인 성공");
    } else {
      alert("이메일 또는 비밀번호가 잘못되었습니다.");
      onRset();
    }
  }, [email, onRset, password, users]);

  //회원가입 페이지로 이동
  const navigte = useNavigate();
  const moveSignUpPage = useCallback(() => {
    navigte("/signUp");
  }, [navigte]);

  return (
    <MainBox>
      <span className="login">로그인</span>
      <Input
        name="email"
        placeholder="이메일 주소"
        onChange={onChange}
        value={email}
        ref={userInput}
      ></Input>
      <Input
        type="password"
        name="password"
        placeholder="비밀번호"
        onChange={onChange}
        value={password}
      ></Input>
      <Button onClick={onCheck}>로그인</Button>
      <span className="notuser" onClick={moveSignUpPage}>
        회원이 아니신가요?
      </span>
    </MainBox>
  );
}

export default Login;
