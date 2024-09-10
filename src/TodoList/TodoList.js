import React, { useState, useContext, useEffect, useMemo } from 'react';
import { TodoListContext } from '../contexts/todoListsContext';
import TaskCard from './TaskCard/TaskCard';

// Import static variables needed
import { arabicLang, englishLang } from './staticVars/StaticVars';
import { buttonStyle, confirmationMessageStyle, cardStyling } from './staticVars/StylingVars';

// Material UI Components
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import { ToggleButton } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';

// Import Unique IDs
import { v4 as uuidv4 } from 'uuid';


export default function TodoList() {
    const { todosList, setTodosList } = useContext(TodoListContext);
    const [displayedTodos, setDisplayedTodos] = useState("all");
    const [taskNameInput, setTaskInput] = useState("");
    const [visibleMessage, setVisibleMessage] = useState(confirmationMessageStyle);
    const [language, setLanguage] = useState(arabicLang)

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
    const todosJSX = renderedTodos?.map((todo) => {
        return (<TaskCard todo={todo} key={todo.id} lang={language} />);
    })

    // Retrieve record to the state
    useEffect(() => {
        // Get stored todos
        const newStorageRecord = JSON.parse(localStorage.getItem("todos"));
        newStorageRecord ? setTodosList(newStorageRecord) : setTodosList([]);
        setTodosList(newStorageRecord);

        // Set then application language
        localStorage.getItem("lang") ? setLanguage(JSON.parse(localStorage.getItem("lang"))) : setLanguage(arabicLang) 
        
    }, [setTodosList])

    // Handle task input
    function handleTaskInput(e) {
        setTaskInput(e.target.value);
    }

    // Adding a todo to the todos list
    function handleTodoSubmit() {
        const newTodo = {
            id: uuidv4(),
            title: taskNameInput,
            disc: ``,
            isCompleted: false,
        };
        const updatedTodos = todosList ? [...todosList, newTodo] : [newTodo];
        setTodosList(updatedTodos);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
        setTaskInput("");

        // Show the confirmation message with a smooth transition
        setVisibleMessage(prev => ({ ...prev, visibility: "visible", opacity: 1 }));

        // Hide the confirmation message after 3 seconds with a smooth transition
        setTimeout(() => {
            setVisibleMessage(prev => ({ ...prev, opacity: 0 }));
            setTimeout(() => {
                setVisibleMessage(prev => ({ ...prev, visibility: "hidden" }));
            }, 300); // Matches the transition duration
        }, 3000);
    }

    // handling display todos according to state
    function todosRenderToggle(e) {
        setDisplayedTodos(e.target.value);
    }

    return (
        <Container dir={language?.direction} maxWidth="sm" sx={{padding: "0"}}>
            <AddedConfirmation style={visibleMessage} />
            <Card style={cardStyling} sx={{textAlign: "center" }}>
                {/* Set application language */}
                <LanguageToggle setLanguage={setLanguage}/>
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
    );
}

function AddedConfirmation({ style }) {
    return (
        <div style={style}>
            <span>تمت اللإضافة بنجاح</span>
        </div>
    );
}

function LanguageToggle({ setLanguage }) {

    // Handling application language toggle
    function changeLanguage(lang) {
        localStorage.setItem("lang", JSON.stringify(lang));
        setLanguage(lang);
    }
    return (
    <ButtonGroup
        disableElevation
        variant="contained"
        dir="ltr"
        style={{position: "absolute", right: "0"}}
    >
        <Button onClick={() => changeLanguage(englishLang)}>En</Button>
        <Button onClick={() => changeLanguage(arabicLang)}>Ar</Button>
    </ButtonGroup>
    );
}
