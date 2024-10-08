import React, { useState, useEffect, useMemo, useContext } from 'react';
import { TodoListContext } from '../contexts/todoListsContext';
import TaskCard from './TaskCard/TaskCard';
// import todosReducer from '../reducers/todosReducer';

// Import static variables needed
import { arabicLang, englishLang } from './staticVars/StaticVars';
import { buttonStyle, confirmationMessageStyle, cardStyling } from './staticVars/StylingVars';

// Import needed custom functions
import { ToastMessage } from './ToastMessage/ToastMessage';
import { LanguageToggle } from './LanguageToggle/LanguageToggle';

// Material UI Components
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import { ToggleButton } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function TodoList() {
    // Using useReducer for state managment, instead of useState of todoList
    // const [todosList, dispatch] = useReducer(todosReducer, []);
    const {todosList, dispatch} = useContext(TodoListContext);
    const [todoFetched, setTodoFetched] = useState(null);
    const [displayedTodos, setDisplayedTodos] = useState("all");
    const [taskNameInput, setTaskInput] = useState("");
    const [showEditPopUp, setShowEditPopUp] = useState(false);
    const [todoDetails, setTodoDetails] = useState({
        name: "",
        disc: ""
    })
    const [visibleMessage, setVisibleMessage] = useState(confirmationMessageStyle);
    const [language, setLanguage] = useState(arabicLang);
    const [toastMessage, setToastMessage] = useState("");

    // General styling
    const generalStyling = {fontFamily: language.fontFamilyType, width: "100%"}

    // Delete popUp states
    const [showDeletePopUp, setShowDeletePopUp] = useState(false);

    // Todos Filteration
    const completedTodos = useMemo(() => {
        return todosList?.filter((todo) => todo.isCompleted);
    }, [todosList]);
    const NotCompletedTodos = useMemo(() => {
        return todosList?.filter((todo) => !todo.isCompleted);
    }, [todosList])

    let renderedTodos = todosList;

    if (displayedTodos === "completed") {
        renderedTodos = completedTodos;
    } else if (displayedTodos === "not-completed") {
        renderedTodos = NotCompletedTodos;
    } else {
        renderedTodos = todosList;
    }

    // Retrieve record to the state
    useEffect(() => {
        dispatch({type: "getRecords"});
        // Set then application language
        localStorage.getItem("lang") ? setLanguage(JSON.parse(localStorage.getItem("lang"))) : setLanguage(arabicLang);
    }, [dispatch])

    // Handle task input
    function handleTaskInput(e) {
        setTaskInput(e.target.value);
    }

    // Toast message appearance
    function toastMessageAppear() {
         // Show the confirmation message with a smooth transition
        setVisibleMessage(prev => ({ ...prev, visibility: "visible", opacity: 1 }));

        // Hide the confirmation message after 3 seconds with a smooth transition
        setTimeout(() => {
            setVisibleMessage(prev => ({ ...prev, opacity: 0 }));
            setTimeout(() => {
                setVisibleMessage(prev => ({ ...prev, visibility: "hidden" }));
            }, 300); // Matches the transition duration
        }, 800);
    }

    // Adding a todo to the todos list
    function handleTodoSubmit() {
        dispatch({type: "added", payload: {
            newTitle: taskNameInput
        }})
        setTaskInput("");
        setToastMessage(language.todoAddMessage);
        toastMessageAppear();
    }

    // handling display todos according to state
    function todosRenderToggle(e) {
        setDisplayedTodos(e.target.value);
    }
    // { ===== Start delete todo method =====}
    // Handle show and disappear of delete popUp
    function openDeletePopUp(todo) {
        setTodoFetched(todo)
        setShowDeletePopUp(true)
    }
    function closeDeletePopUp() {
        setShowDeletePopUp(false);
    }
    // Delete a todo from the todos list
    function handleDeleteTodo(id) {
        dispatch({type: "deleted", payload: {
            taskId: id
        }})
        closeDeletePopUp();
        setToastMessage(language.todoDeletMessage);
        toastMessageAppear();
    }
    // { ===== End delete todo method =====}
    // Handle show and disappear of Edit popUp
    function openEditPopUp(todo) {
        setTodoDetails({name: todo.title, disc: todo.disc});
        setTodoFetched(todo);
        setShowEditPopUp(true);
    }
    function closeEditPopUp() {
        setShowEditPopUp(false)
    }
    // { ===== Start Edit todo method =====}
    // Handling changing task name [State]
    function handleChangeTaskName(e) {
        setTodoDetails({...todoDetails, name: e.target.value})
    }
    // Handling changing task description [State]
    function handleChangeTaskDisc(e) {
        setTodoDetails({...todoDetails, disc: e.target.value})
    }

    // Handle change todo props
    function handleChangeTaskInfo(id) {
        dispatch({type: "updated", payload: {
            taskId: id,
            newName: todoDetails.name,
            newDisc: todoDetails.disc
        }})
        closeEditPopUp();
        setToastMessage(language.todoEditMessage);
        toastMessageAppear();
    }
    // { ===== End Edit todo method =====}
    const todosJSX = renderedTodos?.map((todo) => {
        return (
            <TaskCard
                todo={todo}
                key={todo.id}
                lang={language}
                openDeletePopUp={openDeletePopUp}
                openEditPopUp={openEditPopUp}
                dispatch={dispatch}
            />);
    })
    return (
        <>
        {/* ======= Start Delete dialog ======= */}
        <Dialog
                    open={showDeletePopUp}
                    sx={{fontFamily: language.fontFamilyType}}
                    onClose={closeDeletePopUp}
                >
                    <DialogTitle id="alert-dialog-title" sx={{fontFamily: language.fontFamilyType, textAlign: language.textAligning}}>
                        {language.todoDelete.header}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" sx={{fontFamily: language.fontFamilyType, textAlign: language.textAligning}}>
                            {language.todoDelete.message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>

                        <Button onClick={closeDeletePopUp} sx={{fontFamily: language.fontFamilyType}}>
                            {language.todoDelete.buttons.close}
                        </Button>
                        <Button autoFocus onClick={() => handleDeleteTodo(todoFetched.id)} sx={{fontFamily: language.fontFamilyType}}>
                            {language.todoDelete.buttons.delete}
                        </Button>
                    </DialogActions>
                </Dialog>
        {/* ======= End Delete dialog ======= */}

        {/* ======= Start Start dialog ======= */}
        <Dialog
                open={showEditPopUp}
                onClose={closeEditPopUp}
                sx={{fontFamily: language.fontFamilyType}}
                dir={language.direction}
                PaperProps={{
                    component: 'form',
                }}
            >
                <DialogTitle sx={generalStyling}>{language.todoPropEdit.header}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="name"
                        label={language.todoPropEdit.label.name}
                        value={todoDetails.name}
                        onChange={(e) => handleChangeTaskName(e)}
                        fullWidth
                        variant="standard"
                        sx={generalStyling}
                        
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="details"
                        label={language.todoPropEdit.label.disc}
                        value={todoDetails.disc}
                        onChange={(e) => handleChangeTaskDisc(e)}
                        fullWidth
                        variant="standard"
                        sx={generalStyling}
                    />
                </DialogContent>
                <DialogActions>
                    <Button sx={{fontFamily: language.fontFamilyType, fontWeight: "bold"}} onClick={closeEditPopUp}>{language.todoPropEdit.buttons.close}</Button>
                    <Button sx={{fontFamily: language.fontFamilyType, fontWeight: "bold"}} onClick={() => handleChangeTaskInfo(todoFetched.id)}>{language.todoPropEdit.buttons.edit}</Button>
                </DialogActions>
            </Dialog>
        {/* ======= End Edit dialog ======= */}
        {/* ======= Start Container ======= */}
        <Container dir={language?.direction} maxWidth="sm" sx={{padding: "0"}}>
            <ToastMessage style={visibleMessage} message={toastMessage}/>
            <Card style={cardStyling} sx={{textAlign: "center" }}>
                {/* Set application language */}
                <LanguageToggle setLanguage={setLanguage} englishLang={englishLang} arabicLang={arabicLang}/>
                <CardContent>
                    {/* Header */}
                    <Typography variant="h2" color="text.secondary" sx={{ fontFamily: language?.fontFamilyType }}>
                        {language?.header}
                    </Typography>
                    <Divider role="presentation" />

                    {/* Todos Navigation */}
                    <ToggleButtonGroup
                        value="all"
                        style={{
                            width: "fit-content",
                            margin: "10px auto",
                            border: "1px solid #dcdcdd",
                        }}
                    >
                        <ToggleButton onClick={(e) => todosRenderToggle(e)} value="all" style={buttonStyle}>
                            {language?.toggleButtons.all}
                        </ToggleButton>
                        <ToggleButton onClick={(e) => todosRenderToggle(e)} value="completed" style={buttonStyle}>
                            {language?.toggleButtons.completed
                        }</ToggleButton>
                        <ToggleButton onClick={(e) => todosRenderToggle(e)} value="not-completed" style={buttonStyle}>
                            {language?.toggleButtons.notCompleted}
                        </ToggleButton>
                    </ToggleButtonGroup>

                    {/* Display Todo's */}
                    {todosJSX}

                    {/* Form => Adding new todo */}
                    <Grid container spacing={2}>
                        <Grid xs={8}>
                            <TextField
                                id="outlined-basic"
                                label={language?.todoAddForm.label}
                                variant="outlined"
                                sx={{ width: "100%" }}
                                title={taskNameInput}
                                value={taskNameInput}
                                onChange={(e) => handleTaskInput(e)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleTodoSubmit();
                                    }
                                }}
                            />
                        </Grid>
                        <Grid xs={4}>
                            <Button
                                sx={{ width: "100%", height: "100%" }}
                                variant="contained"
                                onClick={handleTodoSubmit}
                                disabled={taskNameInput.length === 0}
                            > {language?.todoAddForm.button}  </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
        {/* ======= End Container ======= */}
        </>
    );
}

