import React from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
  width?: string;
}

const MainContainer = styled.div<Props>`
  width: ${(props) => props.width || "30%"};
  height: 70%;

  position: relative;
  border-radius: 1%;
  background-color: rgba(0, 0, 0, 0.5);

  margin: 0 auto;
  margin-top: 4rem;
  padding: 5rem;

  display: flex;
  flex-direction: column;
`;

function MainBox({ children }: Props) {
  return <MainContainer>{children}</MainContainer>;
}

export default MainBox;
