import React, { useCallback, useState } from "react";
import axios from "axios";

import useAsync, { getUsers } from "../../customhook/useAsync";
import styled from "styled-components";
import Cloth from "./cloth";

interface Color {
  color?: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Category = styled.div<Color>`
  margin: 0 auto;
  margin-top: 2rem;
  padding: 10px;

  width: 100px;
  height: 100px;

  color: white;
  background-color: black;
  cursor: pointer;

  border-radius: 50%;

  text-align: center;
  align-item: center;

  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

// useAsync 에서는 Promise 의 결과를 바로 data 에 담기 때문에,
// 요청을 한 이후 response 에서 data 추출하여 반환하는 함수를 따로 만들었습니다.
async function getCloth() {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
}

function MyCloset() {
  const [state, fetchData] = useAsync(getUsers, false);
  const { loading, data: users, error } = state;

  const top = "상의";
  const pants = "하의";
  const outer = "아우터";
  const shoes = "신발";
  const [category, setCategory] = useState("상의");

  const TagClick = useCallback((tag: string) => {
    setCategory(tag);
  }, []);

  const renderUserData = () => {
    if (loading) return <div>loading...</div>;
    if (error) return <div>error message {error.message}</div>;
    if (!users) return null;

    const userIds = users.map((user: any) => user.userId);
    const titles = users.map((user: any) => user.title);

    return (
      <div>
        {users.map((user: any) => (
          <li key={user.userId}>
            {user.userId} {user.title}
          </li>
        ))}
      </div>
    );
  };

  return (
    <>
      <Container>
        <Category onClick={() => TagClick(top)}>{top}</Category>
        <Category onClick={() => TagClick(pants)}>{pants}</Category>
        <Category onClick={() => TagClick(outer)}>{outer}</Category>
        <Category onClick={() => TagClick(shoes)}>{shoes}</Category>
      </Container>
      <SubContainer>
        <Cloth categories={category}>사용자의 {category}</Cloth>
        <div>
          <button onClick={fetchData}>Fetch Data</button>
          {/* state 데이터를 사용하여 UI 렌더링 */}
          {renderUserData()}
        </div>
      </SubContainer>
    </>
  );
}

export default MyCloset;
