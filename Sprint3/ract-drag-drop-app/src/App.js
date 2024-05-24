import "./App.css";
import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const finalSpaceCharacters = [
  {
    id: "gary",
    name: "Gary Goodspeed",
  },
  {
    id: "cato",
    name: "Little Cato",
  },
  {
    id: "kvn",
    name: "KVN",
  },
];

function App() {
  const [first, setfirst] = useState(0)


  const [characters, setCharacters] = useState(finalSpaceCharacters);

  const handleEnd = (result) => {
    console.log(first)
    setfirst(()=>{
      return first+1
    })
    console.log(first)
    console.log(result);
    if (!result.destination) return;

    const items = Array.from(characters);
    console.log(items);

    const [reorderedItem] = items.splice(0, 1);
    console.log(reorderedItem)
    
    items.splice(result.destination.index, 0, reorderedItem);
    console.log(items)
    setCharacters(items)
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Final Space Characters</h1>
        <DragDropContext onDragEnd={handleEnd}>
          <Droppable droppableId="characters">
            {(provided) => (
              <ul
                className="characters"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {characters.map(({ id, name }, index) => (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <p>{name}</p>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </header>
    </div>
  );
}

export default App;
