import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TodoItem from "../components/TodoItem";
import Calendar from "../components/Calendar";
import TodoList_Section from "../components/TodoList_Section";
import AddTodo_Section from "../components/AddTodo_Section";
import axios from "axios";

import {
  BaseContainer,
  BaseInnerContainer,
  GridLayout,
} from "../styles/styledComponents";
import { useState } from "react";
import { useEffect } from "react";
import { useReducer } from "react";

// Home에서 GET을 통해 모든 TODO 데이터를 불러오고, id에 따라 알맞게 데이터를 가져옴

const reducer = (state, action) => {
  let newState = [];

  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "REMOVE": {
      newState = state.filter(
        (it) => String(it.todo_id) !== String(action.targetId)
      );
      break;
    }
    case "CREATE": {
      const newItem = { ...action.data };
      newState = [newItem, ...state];
      break;
    }
    case "EDIT": {
      console.log(state[0].todo_id);
      console.log(action.data.targetId);
      newState = state.map((it) =>
        it.todo_id === action.data.targetId ? { ...action.data } : it
      );
      break;
    }
    case "CHECK": {
      console.log("check 상태 변화");
    }
    case "EMOJI": {
      console.log("이모지 변화");
    }
    default:
      return state;
  }
  return newState;
};

export const TodoListStateContext = React.createContext();
export const TodoListDispatchContext = React.createContext();

const Home = () => {
  const dummyData = [
    {
      todo_id: 7,
      user: "걸어봐위엄라이커라이온",
      date: "2024-06-17T17:00:00.123456+09:00",
      content: "멋사와 함께 행복 개발하기",
      is_checked: false,
      emoji: "",
    },
    {
      todo_id: 8,
      user: "걸어봐위엄라이커라이온",
      date: "2024-06-16T11:30:15.123456+09:00",
      content: "투두리스트 API 개발 끝내기",
      is_checked: false,
      emoji: "",
    },
    {
      todo_id: 9,
      user: "걸어봐위엄라이커라이온",
      date: "2024-06-20T15:15:15.123456+09:00",
      content: "건강하기",
      is_checked: false,
      emoji: "",
    },
    {
      todo_id: 10,
      user: "걸어봐위엄라이커라이온",
      date: "2024-06-20T15:15:15.123456+09:00",
      content: "건강하기",
      is_checked: true,
      emoji: "",
    },
    {
      todo_id: 11,
      user: "걸어봐위엄라이커라이온",
      date: "2024-06-20T15:15:15.123456+09:00",
      content: "건강하기",
      is_checked: false,
      emoji: "",
    },
  ];

  const [todoData, dispatch] = useReducer(reducer, dummyData);

  const [editDataId, setEditDataId] = useState("");
  const [isEdit, toggleIsEdit] = useState(false);

  const BASE_URL = import.meta.env.VITE_BASE_URL;

  // Calendar에서 현재 선택된 날짜 관리
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { id } = useParams();

  // Calendar에서 클릭된 날짜 관리
  const dateClicked = (day) => {
    setSelectedDate(day);
  };

  useEffect(() => {
    // getData(); API로 데이터 가져오기
  }, []);
  //사용자 id 출력

  useEffect(() => {
    console.log("TodoData updated:", todoData);
  }, [todoData]);

  const tmpId = "걸어봐위엄라이커라이온";
  const month = 6;
  const day = 17;

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/todos/${tmpId}?month=${month}&day=${day}`
      );
      setTodoData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  //data state 관리
  const onCreate = ({ date, content, is_checked, emoji }) => {
    console.log("content: ", content);
    dispatch({
      type: "CREATE",
      data: {
        date: date,
        content: content,
        is_checked,
        emoji,
      },
    });
  };

  const onRemove = (targetId) => {
    dispatch({
      type: "REMOVE",
      targetId,
    });
  };

  const onEdit = ({ targetId, date, content, is_checked, emoji }) => {
    dispatch({
      type: "EDIT",
      data: {
        targetId,
        date,
        content,
        is_checked,
        emoji,
      },
    });
    toggleIsEdit(false);
    setEditDataId("");
  };

  const onCheck = (targetId, is_checked) => {
    dispatch({
      type: "CHECK",
      data: {
        targetId,
        is_checked,
      },
    });
  };

  const onEmojiAdd = (targetId, emoji) => {
    dispatch({
      type: "CHECK",
      data: {
        targetId,
        emoji,
      },
    });
  };

  const setEditContent = ({ todo_id }) => {
    setEditDataId(todo_id);
    toggleIsEdit(true);
  };

  return (
    <TodoListStateContext.Provider value={todoData}>
      <TodoListDispatchContext.Provider
        value={{ onCreate, onRemove, onEdit, onCheck, onEmojiAdd }}
      >
        <div>
          <LogoWrapper>
            <Logo src="../public/logo/logo.png" alt="logo"></Logo>
          </LogoWrapper>
          <ContentWrapper>
            <GridLayout>
              <CalendarContainer>
                <CalendarInnerContainer>
                  <Calendar
                    selectedDate={selectedDate}
                    dateClicked={dateClicked}
                  ></Calendar>
                </CalendarInnerContainer>
              </CalendarContainer>
              <TODOContainer>
                <AddTodo_Section
                  isEdit={isEdit}
                  selectedDate={selectedDate}
                  editDataId={editDataId}
                ></AddTodo_Section>
              </TODOContainer>
              <ListContainer>
                <TodoList_Section
                  setEditContent={setEditContent}
                ></TodoList_Section>
              </ListContainer>
            </GridLayout>
          </ContentWrapper>
        </div>
      </TodoListDispatchContext.Provider>
    </TodoListStateContext.Provider>
  );
};

const LogoWrapper = styled.div`
  width: auto;
  height: auto;
  background: transparent;
  /* 로고: absolute */
  position: absolute;
  left: 30px;
  top: 20px;
`;

const Logo = styled.img`
  width: 200px;
  height: 90px;
  background: transparent;
`;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CalendarContainer = styled(BaseContainer)`
  width: 367px;
  height: 261px;
  flex-shrink: 0;
  grid-area: 1 / 1 / 2 / 2; /* 1행 1열 */
  background: transparent;
`;

const CalendarInnerContainer = styled(BaseInnerContainer)`
  width: 355px;
  height: 249px;
  flex-shrink: 0;
  background: #fff;
`;

const TODOContainer = styled(BaseContainer)`
  width: 665px;
  height: 261px;
  flex-shrink: 0;
  grid-area: 1 / 2 / 2 / 4; /* 1행 2~3열 */
`;

const ListContainer = styled(BaseContainer)`
  width: 1059px;
  height: 261px;
  flex-shrink: 0;
  grid-area: 2 / 1 / 3 / 4; /* 2행 전체 */
`;

export default Home;

// 좌상단 로고
// 3개의 container
//
