import { v4 as uuidv4 } from 'uuid';

// Here is the logic of To do's CRUD operations
export default function todosReducer(curruntState, action) {
    switch (action.type) {
        // {==== Adding a new to do ====}
        case "added": {
            const newTodo = {
                id: uuidv4(),
                title: action.payload.newTitle,
                disc: "",
                isCompleted: false,
            };
            const updatedTodos = [...curruntState, newTodo];
            localStorage.setItem("todos", JSON.stringify(updatedTodos));
            return updatedTodos;
        }
        // {==== Deleting to do  ====}
        case "deleted": {
            const newList = curruntState?.filter((todo) => todo.id !== action.payload.taskId);
            localStorage.setItem("todos", JSON.stringify(newList));
            return newList;
        }
        // {==== Update to do  ====}
        case "updated": {
            const newTodoList = curruntState?.map((todo) => {
                if (todo.id === action.payload.taskId) {
                    todo.title = action.payload.newName;
                    todo.disc = action.payload.newDisc;
                }
                return todo;
            })
            localStorage.setItem("todos", JSON.stringify(newTodoList));
            return newTodoList
        }
        // { ==== Mark as completed ====}
        case "markComplete": {
            const newTodoList = curruntState?.map((todo) => {
                if (todo.id === action.payload.taskId) {
                    return { ...todo, isCompleted: !todo.isCompleted };
                }
                return todo;
            })
            localStorage.setItem("todos", JSON.stringify(newTodoList));
            return newTodoList;
        }
        // { ==== Get recordes from storage ====}
        case "getRecords": {
            const newStorageRecord = JSON.parse(localStorage.getItem("todos")) || [];
            return newStorageRecord;
        }
        default: {
            throw Error("Unknown Error: " + action.type)
        }
    }
}