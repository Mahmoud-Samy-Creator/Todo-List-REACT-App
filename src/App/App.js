import React from "react";
import TodoList from "../TodoList/TodoList";
import TodoListProvider from "../contexts/todoListsContext";
import './App.scss';


const appStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh"
}


export default function App() {
	return (
    <TodoListProvider>
      <div className="App" style={appStyle}>
        <TodoList />
      </div>
    </TodoListProvider>
	);
}
