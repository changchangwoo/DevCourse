import React, { useState } from "react";
import { Button } from "react-bootstrap";

const Todolist: React.FC = () => {
  type Todo = {
    id: number;
    text: string;
    isChecked: boolean;
  };

  const title: string = "오늘 할 일";
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "공부하기", isChecked: false },
    { id: 2, text: "잠자기", isChecked: false },
    { id: 3, text: "유튜브보기", isChecked: false },
  ]);
  const [newTodo, setNewTodo] = useState<string>("");

  const handleCheckedChange = (itemId: number) => {
    setTodos((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, isChecked: !item.isChecked } : item
      )
    );
  };

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, isChecked: false }]);
      setNewTodo("");
    }
  };

  return (
    <>
      <h1>{title}</h1>
      <div>
        <input
          type="text"
          placeholder="할일 입력"
          onChange={(e) => setNewTodo(e.target.value)}
        ></input>
        <Button onClick={addTodo}> 추가 </Button>
      </div>
      <div className="todoBox">
        {todos.map((todo, index) => (
          <ul>
            <li key={index}>
              <input
                type="checkbox"
                onChange={() => {
                  handleCheckedChange(todo.id);
                }}
              ></input>
              <span>
                {todo.isChecked ? (
                  <del>{todo.text}</del>
                ) : (
                  <span>{todo.text}</span>
                )}
              </span>
            </li>
          </ul>
        ))}
      </div>
    </>
  );
};

export default Todolist;
