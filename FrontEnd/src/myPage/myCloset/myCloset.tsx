import React, { useCallback, useState } from "react";
import useAsync, { getTest, getUsers } from "../../customhook/useAsync";
import styled from "styled-components";
import Cloth from "./cloth";
import ImageSlider from "../../components/imgSlider";
import ClothData from "../../components/clothData";

interface Color {
  color?: string;
}
type TabProps = {
  active: boolean;
};

const Container = styled.div<TabProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;

  .tabs {
    margin: 1rem;
    padding: 0px;
    list-style: none;
    color: #ffffff;
    background-color: black;
  }
  .tabs > li {
    margin: 1rem;
    display: inline-block;
    padding: 10px 15px;
    cursor: pointer;

    transition: font-size 0.3s ease-in-out;

    &:hover {
      font-size: 1.2rem;
    }
  }
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

function MyCloset() {
  const categories = ["TOP", "BOTTOM", "OUTER", "SHOES"];

  const [category, setCategory] = useState(categories[0]);
  const [currentTab, setCurrentTab] = useState(0);

  const TagClick = useCallback((idx: number) => {
    setCategory(categories[idx]);
    setCurrentTab(idx);
  }, []);

  //data 받아오기
  const [state, fetchData] = useAsync(() => getUsers("kookmin123"), true);
  const { loading, data, error } = state;

  const renderUserData = (category: string) => {
    if (loading) return <div>loading...</div>;
    if (error) return <div>error message {error.message}</div>;
    if (!data) return <div>저장된 옷이 없습니다</div>;
    // if (data) console.log(data.images);
    const check = () => {
      try {
        if (category === "TOP") return data.images.top;
        if (category === "BOTTOM") return data.images.pants;
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
    <>
      <Container active>
        <ul className="tabs">
          {categories.map((element, index) => {
            return (
              <li
                key={index}
                style={
                  currentTab === index
                    ? { fontWeight: "bold" }
                    : { fontWeight: "normal" }
                }
                onClick={() => TagClick(index)}
              >
                {element}
              </li>
            );
          })}
        </ul>
        <ClothData category={category}></ClothData>
      </Container>
    </>
  );
}

export default MyCloset;
