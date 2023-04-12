import { useEffect, useReducer } from "react";

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

// 비동기 API 호출 함수 예시
export async function getUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
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

  const fetchData = async () => {
    dispatch({ type: "FETCH_INIT" });
    try {
      const data = await asyncFn();
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (error: any) {
      dispatch({ type: "FETCH_ERROR", payload: error });
    }
  };

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, []);

  return [state as State<T>, fetchData];
}

export default useAsync;
