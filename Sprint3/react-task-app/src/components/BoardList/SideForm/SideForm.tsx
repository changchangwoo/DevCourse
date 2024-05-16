import React, { ChangeEvent, FC, useRef, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { icon, input, sideForm } from "./SideForm.css";
import { useTypedDispatch } from "../../../hooks/redux";
import { v4 as uuidv4 } from "uuid";
import { addBoard } from "../../../store/slices/boardSlices";
import { addLog } from "../../../store/slices/loggerSlice";

type TSideFormProps = {
  setIsFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  inputRef: React.RefObject<HTMLInputElement>;
};
const SideForm: FC<TSideFormProps> = ({ setIsFormOpen }) => {
  const dispatch = useTypedDispatch();
  const [inputText, setInputText] = useState("");
  const handleOnBlur = () => {
    setIsFormOpen(false);
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleClick = () => {
    if (inputText) {
      dispatch(
        addBoard({
          board: { boardId: uuidv4(), boardName: inputText, lists: [] 
          },
        })
      );
      dispatch (
        addLog({
          logId: uuidv4(),
          logMessage : `게시판 등록: ${inputText}`,
          logAuthor : "User",
          logTimestamp : String(Date.now())
        })
      )
    }
  };

  return (
    <div className={sideForm}>
      <input
        autoFocus={true}
        className={input}
        type="text"
        placeholder="새로운 게시판 등록하기"
        value={inputText}
        onChange={handleChange}
        onBlur={handleOnBlur}
      />
      <FiCheck className={icon} onMouseDown={handleClick} />
    </div>
  );
};

export default SideForm;
