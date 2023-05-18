import { useCallback, useEffect, useReducer } from "react";

// 액션 타입 정의
type Action<T> =
  | { type: "FETCH_INIT" }
  | { type: "FETCH_SUCCESS"; payload: T }
  | { type: "FETCH_ERROR"; payload: any };

type State<T> = {
  data: T | null;
  loading: boolean;
  error: any | null;
};

const jaemin = "192.168.200.198:8080";
const apiIp = "14.6.121.141:8080";
const test = "78f5-120-142-36-198.ngrok-free.app";
const Upload = "codyFeedUpload.json";
const myCloset = "myClothMockUp.json";

export async function getTest(funct: string) {
  let test;
  if (funct === "mycloset") test = myCloset;
  if (funct === "codyfeed") test = Upload;
  const response = await fetch(`/mockupData/${test}`);
  const data = await response.json();
  return data;
}

export async function getTesting() {
  const response = await fetch(`http://192.168.35.177:8080/testing`);
  const data = await response.json();
  return data;
}
// 내 옷장 불러오기
export async function getUsers(id: string) {
  const response = await fetch(`http://${jaemin}/api/getMycloset2/${id}`);
  const data = await response.json();
  return data;
}

// 내 옷 새로 추가
export async function createMyCloth(
  postData: any,
  category: string,
  id: string
) {
  console.log(postData);
  console.log(category);
  console.log(id);
  const formData = new FormData();

  for (let i = 0; i < postData.length; i++) {
    formData.append("file", postData[i].file);
  }
  const boundary = generateBoundary();

  const response = await fetch(
    `http://${jaemin}/api/uploadTempCloset_${category}?userid=${id}`,
    {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": `multipart/form-data; boundary=${boundary}`,
      },
    }
  ).then((res) => {
    if (res.ok) alert("새로운 옷이 추가되었습니다.");
    else alert("이미지 업로드 실패");
  });

  const data = await response;
  return data;
}

//경계값 설정
function generateBoundary(): string {
  const characters =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const length = 16; // 경계 값의 길이 설정

  let boundary = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    boundary += characters[randomIndex];
  }

  return boundary;
}

// 옷삭제
export async function deleteImg(img: string) {
  const response = await fetch(
    `http://${jaemin}/api/deleteMyCloset?imageUrl=${img}`,
    {
      method: "DELETE",
    }
  ).then((res) => {
    if (res.ok) alert("옷이 삭제되었습니다.");
    else alert("옷 삭제 실패!");
  });

  const data = await response;
  return data;
}

export async function getWishList(id: string) {
  const response = await fetch(`http://${apiIp}/api/getWishlist/${id}`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
}

export async function getFeedPage() {
  const response = await fetch(`http://${jaemin}/api/getFeedpage/uploadTime`, {
    method: "GET",
  });
  const data = await response.json();
  return data;
}

//좋아요 수 증가
export async function IncreaseCount(imgUrl: string) {
  const response = await fetch(
    `http://172.30.1.5:8080/api/increaseCount?=${imgUrl}`,
    {
      method: "PUT",
    }
  );

  const data = await response.json();
  return data;
}

// 리듀서 함수
function reducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case "FETCH_INIT":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, data: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      throw new Error(`Unhandled action type`);
  }
}

// useAsync 훅
function useAsync<T>(
  asyncFn: () => Promise<T>,
  immediate = true
): [State<T>, () => void] {
  const initialState: State<T> = { data: null, loading: false, error: null };

  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = useCallback(async () => {
    dispatch({ type: "FETCH_INIT" });
    try {
      const data = await asyncFn();
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (error: any) {
      dispatch({ type: "FETCH_ERROR", payload: error });
    }
  }, []);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, []);

  return [state as State<T>, fetchData];
}

export default useAsync;
