import React from "react";
import { FiTrash2 } from "react-icons/fi";

const style = {
  li: "flex justify-between p-4 my-2 bg-slate-300 rounded-md capitalize",
  liComplete: "flex justify-between p-4 my-2 bg-slate-500",
  textComplete: "ml-2 cursor-pointer line-through capitalize",
};

const Todo = ({ todo,toggleComplete, deleteTodo }) => {
  return (
    <li className={todo.completed?style.liComplete:style.li}>
      <div className="flex justify-start">
        <input onChange={()=>toggleComplete(todo )} type="checkbox" checked={!!todo.completed}/>
        <p onClick={()=>toggleComplete(todo)}
  className={`text-slate-800 cursor-pointer ml-2 ${
    todo.completed ? style.textComplete : ""
  }`}
>
  {todo.text}
</p>

      </div>
      <button onClick={()=>deleteTodo(todo.id)}>
        <FiTrash2 className="w-5 h-5 text-red-700" />
      </button>
    </li>
  );
};

export default Todo;
