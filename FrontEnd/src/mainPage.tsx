import React from "react";
import styled, { keyframes } from "styled-components";
import backImg from "../src/img/back.jpeg";

const FadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;
const MainWrapper = styled.div`
  background-image: url(${backImg});
  background-repeat: no-repeat;
  background-attachment: fixed; /* 배경 이미지가 스크롤에 고정되도록 설정 */
  background-size: 40%;
  background-position: right center;

  animation: ${FadeIn} 1s ease-out forwards;
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 12rem;
  margin-left: 2rem;
  opacity: 0;
  animation: ${FadeIn} 1s ease-out forwards;
  position: relative;

  .title {
    color: black;
    font-size: 5.4rem;
  }

  .explain {
    font-size: 1.6rem;
    color: black;
    margin: 1rem;
  }
`;

function MainPage() {
  return (
    <MainWrapper>
      <TitleBox>
        <span className="title">
          나만의 작은 코디네이터,<br></br> 당신의 스타일을 책임지다
        </span>
        <span className="explain">
          {" "}
          자신에게 어울리는 스타일을 찾아주는 AI 기반 의류 추천 서비스{" "}
        </span>
      </TitleBox>
    </MainWrapper>
  );
}

export default MainPage;
