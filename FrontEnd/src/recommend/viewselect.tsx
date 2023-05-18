import React, { useState } from "react";
import styled from "styled-components";

interface imgList {
  id: number;
  imgsrc: string;
}

interface Props {
  selected: any;
  onSelectListChange: (selectlist: imgList[]) => void; // 콜백 함수 타입 정의
}
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
function ViewSelected({ selected, onSelectListChange }: Props) {
  const [selectlist, setSelectList] = useState<imgList[]>(selected);
  const handleSelect = (image: string) => {
    let templist = [...selectlist];

    //중복이미지 체크
    for (let i = 0; i < templist.length; i++) {
      if (templist[i].imgsrc === image) {
        return alert("중복된 이미지 입니다.");
      }
    }
    //이미지 추가로직 구현
    templist.push({ id: templist.length + 1, imgsrc: image });

    setSelectList(templist);
    onSelectListChange(selectlist);
  };

  const deleteImg = (imgsrc: string) => {
    if (window.confirm("삭제하시겠습니까?")) {
      setSelectList(selectlist.filter((img) => img.imgsrc !== imgsrc));
      onSelectListChange(selectlist);
    }
  };
  return (
    <SelectList>
      <span>
        <b>선택된 옷</b>
      </span>
      <div className="selectImg">
        {selectlist.map((img) => (
          <img
            key={img.id}
            src={img.imgsrc}
            onClick={() => deleteImg(img.imgsrc)}
          ></img>
        ))}
      </div>
    </SelectList>
  );
}

export default ViewSelected;
