import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/button";

interface imgList {
  id: number;
  imgsrc: string;
}

interface Props {
  data: any;
  //   onSelectListChange?: (selectlist: imgList[]) => void; // 콜백 함수 타입 정의
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;
const ImgContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  margin: 1rem;
  padding: 1rem;

  .img {
    width: 130px;
    height: 130px;
    cursor: pointer;
  }
`;
const SelectList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 1px solid black;

  span {
    margin: 1rem;
    font-family: "NanumSquareRound";
    font-style: normal;
  }

  .selectImg {
    display: flex;
    flex-direction: row;
    maring-top: 1rem;
    border-radius: 10px;
    align-items: center;
    justify-content: center; /* 이미지를 가운데 정렬하는 속성 추가 */
  }

  img {
    width: 130px;
    heigth: 130px;
    margin: 1rem;
  }
`;

function ViewCloth({ data }: any) {
  const [selectlist, setSelectList] = useState<imgList[]>([]);

  const [imglist, setImageList] = useState<imgList[]>(data);
  const [idx, setIdx] = useState(0);

  const prevImg = () => {
    setIdx(idx === 0 ? imglist.length - 1 : idx - 1);
  };
  const nextImg = () => {
    setIdx(idx === imglist.length - 1 ? 0 : idx + 1);
  };

  //   const handleSelect = (image: string) => {
  //     let templist = [...selectlist];

  //     //중복이미지 체크
  //     for (let i = 0; i < templist.length; i++) {
  //       if (templist[i].imgsrc === image) {
  //         return alert("중복된 이미지 입니다.");
  //       }
  //     }
  //     //이미지 추가로직 구현
  //     templist.push({ id: templist.length + 1, imgsrc: image });

  //     setSelectList(templist);
  //     // onSelectListChange(templist);
  //   };

  //   const deleteImg = (imgsrc: string) => {
  //     if (window.confirm("삭제하시겠습니까?")) {
  //       return setSelectList(selectlist.filter((img) => img.imgsrc !== imgsrc));
  //     }
  //   };
  return (
    <>
      <Container>
        <ImgContainer>
          <Button fontcolor="skyblue" onClick={prevImg}>
            &lt;
          </Button>
          <img
            className="img"
            src={imglist[idx].imgsrc}
            // onClick={() => handleSelect(imglist[idx].imgsrc)}
          ></img>
          <Button onClick={nextImg} fontcolor="skyblue">
            &gt;
          </Button>
        </ImgContainer>
      </Container>
    </>
  );
}
export default ViewCloth;
