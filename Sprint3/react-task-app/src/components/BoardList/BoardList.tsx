import React, { FC, useRef, useState } from 'react'
import { useTypedSelector } from '../../hooks/redux'
import SideForm from './SideForm/SideForm'
import { FiPlusCircle } from 'react-icons/fi'
import { addButton, addSection, boardItem, boardItemActive, container, title } from './BoardList.css'
import clsx from 'clsx'

type TBoardListProps = {
  activeBoardId: string;
  setActiveBoardId: React.Dispatch<React.SetStateAction<string>>;
}

const BoardList: FC<TBoardListProps> = ({
  activeBoardId,
  setActiveBoardId
}) => {

  const { boardArray } = useTypedSelector(state => state.boards);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setIsFormOpen(!isFormOpen)
    // setTimeout(()=> {

    // }, 0);
    // inputRef.current?.focus();
  }
  const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <div className={container}>
      <div className={title}>
        게시판 :
      </div>
      {boardArray.map((board, index) => (
        <div key={board.boardId}
        onClick={() => setActiveBoardId(boardArray[index].boardId)}
        className={
          clsx({
            [boardItemActive]:
            boardArray.findIndex(b => b.boardId === activeBoardId) === index,
          },
          {
            [boardItem] :
            boardArray.findIndex(b=> b.boardId === activeBoardId) !== index,
        
          }  )
        }>
          <div>
            {board.boardName}
          </div>
        </div>
      ))}
      <div className={addSection}>
        {
          isFormOpen ?
            <SideForm inputRef={inputRef} setIsFormOpen={setIsFormOpen} />
            :
            <FiPlusCircle onClick={handleClick} className={addButton}/>
        }
      </div>
    </div>
  )
}

export default BoardList
