import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import { db } from "./firebase";
import {collection,query,onSnapshot,updateDoc,doc, addDoc, deleteDoc} from "firebase/firestore";
import { motion } from 'motion/react';


const style = {
  bg: `min-h-screen w-full p-4 bg-gradient-to-r from-[#2F88ED] to-[#1CB5E4]`,
  container: `bg-slate-700 w-full shadow-lg p-4 m-auto max-w-[500px] rounded-md text-white shadow-slate-600`,
  heading: `text-white font-bold text-3xl text-center p-2`,
  form: "p-4 rounded-md mt-1 flex flex-col sm:flex-row sm:items-center gap-4",
  input: `rounded-md w-full p-3 border-blue-400 border-1 focus:outline-white text-white sm:w-[70%]`,
  button: `bg-blue-500 border-blue-600 text-white shadow-blue-600/50 hover:bg-blue-700 active:bg-blue-600 px-4 py-3 text-sm rounded-md border-b-3 cursor-pointer active:scale-95 active:border-b-2 active:translate-y-1`,
  count: `text-center p-2`,
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState(" ");

  //read
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q,(querySnapshot) => {
        // Debug log so you can see exactly what Firestore returns
        console.log(
          "snapshot docs raw:",
          querySnapshot.docs.map((d) => ({ id: d.id, data: d.data() }))
        );

        const todosArr = [];
        querySnapshot.forEach((doc) => {
          // <-- CALL doc.data() and spread its returned object
          todosArr.push({ id: doc.id, ...doc.data() });
        });

        setTodos(todosArr);
      },
      (error) => {
        console.error("onSnapshot error:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  //create
  const createTodo = async (e) => { 
    e.preventDefault();
    if(input ===""){
      alert("Please enter a valid todo");
      return;
    }
    await addDoc(collection(db,"todos"),{
      text:input,
      completed:false,
    });
    setInput("");
  }

  //update
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  //delete
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id)
    );
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>

        <form className={style.form} onSubmit={createTodo}>
          <input
            type="text"
            placeholder="Add Todo"
            className={style.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
           <motion.button
      whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  whileInView={{ opacity: 1 }}
      className={style.button}
      type="submit"
    >
            Add Task
          </motion.button>
        </form>

        <ul className="overflow-y-auto space-y-2 max-h-[60vh]">
          {todos.map((todo) => (
            // use the Firestore doc id as the key (not index)
            <Todo key={todo.id} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo}/>
          ))}
        </ul>

      {todos.length > 0 && (
  <p className={style.count}>
    You have {todos.length} {todos.length === 1 ? "todo" : "todos"}
  </p>
)}

      </div>
    </div>
  );
}

export default App;