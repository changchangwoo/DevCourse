import { useState } from "react";
import {
  appContainer,
  board,
  buttons,
  deleteBoardButton,
  loggerButton,
} from "./App.css";
import BoardList from "./components/BoardList/BoardList";
import ListsContainer from "./components/ListsContainer/ListsContainer";
import { useTypedDispatch, useTypedSelector } from "./hooks/redux";
import EditModal from "./components/EditModal/EditModal";
import LoggerModal from "./components/LoggerModal/LoggerModal";
import { deleteBoard, sort } from "./store/slices/boardSlices";
import { addLog } from "./store/slices/loggerSlice";
import { v4 } from "uuid";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const [isLoggerOpen, setisLoggerOpen] = useState(false);
  const [activeBoardId, setActiveBoardId] = useState("board-0");
  const boards = useTypedSelector((state) => state.boards.boardArray);
  const modalActive = useTypedSelector((state) => state.boards.modalActive);
  const getActiveBoard = boards.filter(
    (board) => board.boardId === activeBoardId
  )[0];
  const lists = getActiveBoard.lists;
  const dispatch = useTypedDispatch();

  const handleDeleteBoard = () => {
    if (boards.length > 1) {
      dispatch(deleteBoard({ boardId: getActiveBoard.boardId }));
      dispatch(
        addLog({
          logId: v4(),
          logMessage: `게시판 지우기: ${getActiveBoard.boardName}`,
          logAuthor: "User",
          logTimestamp: String(Date.now()),
        })
      );

      const newIndexToSet = () => {
        const indexToBeDeleted = boards.findIndex(
          (board) => board.boardId === activeBoardId
        );
        return indexToBeDeleted === 0
          ? indexToBeDeleted + 1
          : indexToBeDeleted - 1;
      };
      setActiveBoardId(boards[newIndexToSet()].boardId);
    } else {
      alert("최소 게시판 개수는 한 개입니다.");
    }
  };

  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId } = result;
    console.log("lists", lists);
    const sourceList = lists.filter(
      //내가 움직인 Task가 속해있는 list
      (list) => list.listId === source.droppableId
    )[0];
    console.log(sourceList);
    dispatch(
      sort({
        boardIndex: boards.findIndex(
          (board) => board.boardId === activeBoardId
        ),
        droppableIdStart: source.droppableId, //출발하는 곳의 Id
        droppableIdEnd: destination.droppableId, //도착하는 곳의 Id
        droppableIndexStart: source.index, //출발하는 곳의 인덱스
        droppableIndexEnd: destination.index, //도착하는 곳의 인덱스
        draggableId, //Task의 id
      })
    );
    dispatch(
      addLog({
        logId: v4(),
        logMessage: `리스트 "${source.listName}에서 리스트 "${
          lists.filter((list) => list.listId === destination.draggableId)[0]
            .listName
        }으로 ${
          sourceList.tasks.filter((task) => task.taskId === draggableId)[0]
            .taskName
        }을 옮김.`,
        logAuthor: "User",
        logTimestamp: String(Date.now()),
      })
    );
  };

  return (
    <div className={appContainer}>
      {modalActive ? <EditModal /> : null}
      {isLoggerOpen ? <LoggerModal setIsLoggerOpen={setisLoggerOpen} /> : null}
      <BoardList
        activeBoardId={activeBoardId}
        setActiveBoardId={setActiveBoardId}
      />

      <div className={board}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <ListsContainer lists={lists} boardId={getActiveBoard.boardId} />
        </DragDropContext>
      </div>
      <div className={buttons}>
        <button className={deleteBoardButton} onClick={handleDeleteBoard}>
          이 게시판 삭제하기
        </button>
        <button
          className={loggerButton}
          onClick={() => setisLoggerOpen(!isLoggerOpen)}
        >
          {isLoggerOpen ? "활동 목록 숨기기" : "활동 목록 보이기"}
        </button>
      </div>
    </div>
  );
}

export default App;
