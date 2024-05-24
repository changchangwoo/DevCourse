import { useState } from "react";
import "./App.css";
import Timer from "./Timer";
import Todolist from "./TodoList";

function App() {
  const [first, setfirst] = useState(0)
  console.log(first)
  setfirst(1)
  console.log(first)
  return (
    <>
    <div className="container nanum-gothic-regular">
      <Todolist/>
      <Timer/>
    </div>
    </>
  )
}

export default App;