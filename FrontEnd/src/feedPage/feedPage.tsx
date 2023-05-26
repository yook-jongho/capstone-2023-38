import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styled from "styled-components";
import MainBox from "../components/mainBox";
import useAsync, { getFeedPage, getTest } from "../customhook/useAsync";

const SortStandard = styled.div`
  margin: 2rem;
  span {
    marign: 0.4rem;
    padding: 1rem;
    cursor: pointer;

    transition: font-size 0.3s ease-in-out;

    &:hover {
      font-size: 1.2rem;
    }
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`;

const CodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem;

  .img {
    max-width: 300px;
    max-height: 300px;
    border: 5px solid #white;
    border-radius: 0.2rem;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.5);
  }

  .id_upload {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .id_like {
    display: flex;
    flex-direction: column;
  }
`;

function FeedPage() {
  const [state, fetchData] = useAsync(() => getTest("codyfeed"), true);
  const { loading, data, error } = state;

  const getUploadTime = (uploadTime: Date) => {
    const parsedDate = new Date(uploadTime);
    const time = parsedDate.toLocaleTimeString();

    return time;
  };

  const renderFeedList = () => {
    if (loading) return <div>loading...</div>;
    if (error) return <div>error message {error.message}</div>;
    if (!data) return null;

    return (
      <>
        {data.map((item: any) => (
          <CodyContainer key={item.imgsrc}>
            <img className="img" src={item.imgsrc} alt="Cody Image" />
            <div className="id_upload">
              <div className="id_like">
                <span style={{ marginTop: "10px" }}>{item.userid}</span>
                <span>
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{ color: "#ff0000" }}
                  />{" "}
                  {item.wcount}
                </span>
              </div>
              <span>{getUploadTime(item.uploadtime)}</span>
            </div>
          </CodyContainer>
        ))}
      </>
    );
  };

  return (
    <>
      <SortStandard>
        <span>인기순 </span>
        <span> | </span>
        <span>최신순 </span>
      </SortStandard>
      <MainContainer>{renderFeedList()}</MainContainer>
    </>
  );
}

export default FeedPage;
