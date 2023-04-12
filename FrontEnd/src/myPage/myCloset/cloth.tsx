import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Button from "../../components/button";
import Dialog from "../../components/dialog";
import ImgUpload from "../../imgUpload/imgUpload";

interface Props {
  children: React.ReactNode;
  categories: string;
  data?: object;
}
const ClothBox = styled.div`
  display: flex;
  flex-direction: column;

  width: 70%;
  heigth: 50%;
  max-width: 50%;
  max-heigth: 70%;ß
  overflow: hidden;

  margin : 4rem auto;
  padding: 1rem;
  border: 1px solid #c8c8c8;
  border-radius: 0.2rem;

  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
`;

const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;

  .img-div {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .img {
    max-width: 200px;
    max-height: 200px;
    margin-top: 2rem;
  }
`;

function Cloth({ categories, children, data }: Props) {
  return (
    <ClothBox>
      <h2>{categories}</h2>
      {children}
      <ImgBox>{}</ImgBox>
      <div>
        <Dialog btnContext="+" title="새로운 옷을 업로드하세요">
          <ImgUpload></ImgUpload>
        </Dialog>
      </div>
    </ClothBox>
  );
}

export default Cloth;
