export const TodoItems = ({ setTodos, todoid, done, text }) => {
  const deleteTodo = (todoid) => {
    let data = JSON.parse(localStorage.getItem("todos"));
    data = data.filter((todo) => todo.todoid !== todoid);
    setTodos(data);
  };

  const toggle = (todoid) => {
    let data = JSON.parse(localStorage.getItem("todos"));
    for (let i = 0; i < data.length; i++) {
      if (data[i].todoid === todoid) {
        data[i].done = !data[i].done;
        break;
      }
    }
    setTodos(data);
  };
  return (
    <div className="flex flex-row p-1 justify-center items-center">
      <div className="mr-auto">
        <input
          type="checkbox"
          checked={done}
          onChange={() => {
            toggle(todoid);
          }}
          name={`todo-${todoid}`}
          id={todoid}
          className="form-checkbox bg-blue-100 border-blue-300 text-blue-500 focus:ring-blue-200"
        />
      </div>
      <p className={`font-medium ${done ? "line-through" : ""}`}>{text}</p>
      <div className="ml-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-red-600"
          onClick={() => {
            deleteTodo(todoid);
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </div>
    </div>
  );
};
