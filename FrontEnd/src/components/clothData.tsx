import React from "react";
import styled from "styled-components";
import useAsync, { getTest, getUsers } from "../customhook/useAsync";
import ImgUpload from "../imgUpload/imgUpload";
import Button from "./button";
import Dialog from "./dialog";
import ImageSlider from "./imgSlider";

interface Props {
  category: string;
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

function ClothData({ category }: Props) {
  //data 받아오기
  const [state, fetchData] = useAsync(() => getTest("mycloset"), true);
  const { loading, data, error } = state;

  const renderUserData = () => {
    if (loading) return <div>loading...</div>;
    if (error) return <div>error message {error.message}</div>;
    if (!data) return <div>저장된 옷이 없습니다</div>;
    // if (data) console.log(data.images);
    const check = () => {
      try {
        if (category === "TOP") return data.images.top;
        if (category === "BOTTOM") return data.images.bottom;
        if (category === "OUTER") return data.images.outer;
        if (category === "SHOES") return data.images.shoes;
      } catch (e: any) {
        console.log(e);
      }
    };
    const uiData = check();
    console.log(uiData);
    // const userIds = data.map((user: any) => user.userId);
    if (!uiData) return <div>{category} 카테고리에 등록된 옷이 없습니다.</div>;

    return <ImageSlider images={uiData}></ImageSlider>;
  };

  return (
    <ClothBox>
      <h2>{category}</h2>
      {renderUserData()}
      <div>
        <Dialog text="추가" title="새로운 옷을 업로드하세요">
          <ImgUpload category={category}></ImgUpload>
        </Dialog>
      </div>
    </ClothBox>
  );
}

export default ClothData;
