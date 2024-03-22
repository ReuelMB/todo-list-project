import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { TodoItems } from "./TodoItems";

export const Todo = () => {
  let storedTodos = localStorage.getItem("todos");
  storedTodos = storedTodos ? JSON.parse(storedTodos) : [];
  const [todos, setTodos] = useState(storedTodos);
  const [withError, setError] = useState(false);
  const inputRef = useRef(null);

  const addTodo = () => {
    const todoid = Date.now();
    if (inputRef.current.value) {
      setError(false);
      setTodos([
        ...todos,
        { todoid: todoid, text: inputRef.current.value, done: false },
      ]);
      inputRef.current.value = "";
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="h-screen bg-gray flex flex-col justify-center items-center">
      <div className="flex flex-col bg-white h-full sm:h-3/4 rounded-lg w-full sm:w-[600px] p-5">
        <div className="flex flex-col my-5">
          <div className="font-bold text-3xl my-5">To-Do List</div>
          <div className="flex flex-row justify-center items-center">
            <input
              ref={inputRef}
              type="text"
              placeholder={withError ? "Task Required" : "Add Your Task"}
              className={`rounded-full bg-slate-200 hover:bg-slate-300 text-sl w-full h-20 pl-5 ${withError ? 'border-red-500 placeholder-red-500' : 'border-none outline-none'}`}
            />
            <button
              type="button"
              onClick={() => {
                addTodo();
              }}
              className="bg-red-400 hover:bg-red-500 rounded-full w-44 h-20 flex justify-center items-center -ms-20 cursor-pointer text-lg font-semibold"
            >
              ADD
            </button>
          </div>
        </div>
        <div className="flex flex-col m-5 overflow-y-auto">
          {todos.map((items, index) => {
            return (
              <TodoItems
                key={index}
                setTodos={setTodos}
                todoid={items.todoid}
                done={items.done}
                text={items.text}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
