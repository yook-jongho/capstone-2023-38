import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import Button from "../../components/button";
import Dialog from "../../components/dialog";
import useAsync, { deleteImg } from "../../customhook/useAsync";
import ImgUpload from "../../imgUpload/imgUpload";

interface Props {
  children: React.ReactNode;
  categories: string;
  data?: object;
}
const ClothBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 50%;
  max-heigth: 70%;
  overflow: scroll;

  margin: 1rem auto;
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

function Cloth({ children, categories }: Props) {
  console.log(children);
  const [imgurl, setImgUrl] = useState("");
  const [state, fetchData] = useAsync(() => deleteImg(imgurl));

  return (
    <ClothBox>
      <h2>{categories}</h2>
      <ImgBox>{children}</ImgBox>
      <div>
        <Dialog text="+" title="새로운 옷을 업로드하세요">
          <ImgUpload category={categories}></ImgUpload>
        </Dialog>
        <Button>-</Button>
      </div>
    </ClothBox>
  );
}

export default Cloth;
