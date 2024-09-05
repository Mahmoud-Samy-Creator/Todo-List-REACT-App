import React from "react";
import TodoList from "../TodoList/TodoList";
import { TodoListContext } from "../contexts/todoListsContext";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";
import './App.scss';


const appStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh"
}

const todos = [
  {
      id: uuidv4(),
      title: "المهمة الأولي",
      disc: "وصف المهمة الأولي",
      isCompleted: false
  },
  {
      id: uuidv4(),
      title: "المهمة الثانية",
      disc: "وصف المهمة الثانية",
      isCompleted: false
  },
  {
      id: uuidv4(),
      title: "المهمة الثالثة",
      disc: "وصف المهمة الثالثة",
      isCompleted: false
  },
]

export default function App() {
  const [todosList, setTodosList] = useState(todos);
	return (
    <div className="App" style={appStyle}>
      <TodoListContext.Provider value={{todosList, setTodosList}}>
        <TodoList />
      </TodoListContext.Provider>
    </div>
	);
}
