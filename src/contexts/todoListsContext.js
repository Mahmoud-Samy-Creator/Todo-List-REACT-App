import { createContext } from "react";
import { useReducer } from "react";
import todosReducer from "../reducers/todosReducer";

export const TodoListContext = createContext([]);

const TodoListProvider = ({ children }) => {
    const [todosList, dispatch] = useReducer(todosReducer, []);
    return(
        <TodoListContext.Provider value={{todosList, dispatch}}>
            {children}
        </TodoListContext.Provider>
    );
}

export default TodoListProvider;