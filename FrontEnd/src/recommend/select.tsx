import React, { useState } from "react";
import styled from "styled-components";
import useAsync, { getTest, getUsers } from "../customhook/useAsync";
import ViewCloth from "./viewcloth";

interface imgList {
  id: number;
  imgsrc: string;
}

interface Props {
  category: string;
}

const Container = styled.div`
  width: 30%;
  border-radius: 1%;
  align-items: center;
  text-align: center;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  margin: 0.5rem;
`;
function Select({ category }: Props) {
  // console.log(category);
  const [state, fetchData] = useAsync(() => getTest("mycloset"), true);
  const { loading, error, data } = state;

  const [selectedList, setSelectedList] = useState<imgList[]>([]);

  // const handleSelectListChange = (selectlist: imgList[]) => {
  //   setSelectedList(selectlist);
  //   console.log(selectedList);
  //   // 선택된 리스트에 대한 추가 처리나 상태 업데이트를 수행할 수 있습니다.
  //   // 예: 다른 상태 값 변경, API 호출 등
  // };

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

    return (
      <ViewCloth
        data={uiData}
        // onSelectListChange={handleSelectListChange}
      ></ViewCloth>
    );
  };
  //   console.log(data);

  return (
    <Container>
      {category}
      {renderUserData()}
    </Container>
  );
}
export default Select;
