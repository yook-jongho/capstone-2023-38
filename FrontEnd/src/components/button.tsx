import React from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
  color?: string;
  onCheck?: any;
}
const StyledButton = styled.button`
  // basic style
  display: inline-block;
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;

  //size
  height: 2.25rem;
  font-size: 1rem;

  //color
  background: ${(props) => props.color || "#228be6"};
  &:hover {
    background: #339af0;
  }
  &:active {
    background: #1c7ed6;
  }

  //etc
  & + & {
    margin-left: 1rem;
  }
  margin-top: 1rem;
`;

function Button({ onCheck, color, children, ...rest }: Props) {
  return (
    <StyledButton color={color} {...rest} onClick={onCheck}>
      {children}
    </StyledButton>
  );
}

export default Button;
