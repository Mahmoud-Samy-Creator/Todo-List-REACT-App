import React, { useContext, useState } from 'react';
import { TodoListContext } from '../../contexts/todoListsContext';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';


// Styling
// Options styling
const deleteOption = {
    padding: "6px",
    border: "1px solid #f63a3a",
    color: "#f63a3a",
}

const editOption = {
    padding: "6px",
    border: "1px solid #1565c0",
    color: "#1565c0",
}



// localStorage.clear();
export default function TaskCard({ todo, lang }) {
    const {todosList, setTodosList} = useContext(TodoListContext);
    const [showDeletePopUp, setShowDeletePopUp] = useState(false);
    const [showEditPopUp, setShowEditPopUp] = useState(false);
    const [todoDetails, setTodoDetails] = useState({
        name: todo.title,
        disc: todo.disc
    })
    // General styling
    const generalStyling = {fontFamily: lang.fontFamilyType, width: "100%"}

    // Handle check userFeedBack
    const checkColorOnState = todo.isCompleted ? "#65bfb4" : "white";
    const checkColorOnStateColor = todo.isCompleted ? "white" : "#65bfb4";
    const checkOption = {
        padding: "6px",
        color: checkColorOnStateColor,
        border: `1px solid #65bfb4`,
        background: `${checkColorOnState} !important`
    }

    // Action Handlers

    // Delete a todo from the todos list
    function handleDeleteTodo(id) {
        setShowDeletePopUp(false);
        const newList = todosList.filter((todo) => todo.id !== id);
        localStorage.setItem("todos", JSON.stringify(newList));
        setTodosList(newList);
    }

    // Handle check a todo as completed
    function handleTodoCheck(id) {
        const newTodoList = todosList.map((todo) => {
            if (todo.id === id) {
                todo.isCompleted = !todo.isCompleted;
            }
            return todo;
        })
        localStorage.setItem("todos", JSON.stringify(newTodoList));
        setTodosList(newTodoList);
    }

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
        const newTodoList = todosList.map((todo) => {
            if (todo.id === id) {
                todo.title = todoDetails.name;
                todo.disc = todoDetails.disc;
            }
            return todo;
        })
        setTodosList(newTodoList);
        localStorage.setItem("todos", JSON.stringify(newTodoList));
        setShowEditPopUp(false);
    }

    return(
        <>
            {/* Start Edit task popUp */}
            <Dialog
                open={showEditPopUp}
                onClose={() => setShowEditPopUp(false)}
                sx={{fontFamily: lang.fontFamilyType}}
                dir={lang.direction}
                PaperProps={{
                    component: 'form',
                }}
            >
                <DialogTitle sx={generalStyling}>{lang.todoPropEdit.header}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="name"
                        name="name"
                        label={lang.todoPropEdit.label.name}
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
                        label={lang.todoPropEdit.label.disc}
                        value={todoDetails.disc}
                        onChange={(e) => handleChangeTaskDisc(e)}
                        fullWidth
                        variant="standard"
                        sx={generalStyling}
                    />
                </DialogContent>
                <DialogActions>
                    <Button sx={{fontFamily: lang.fontFamilyType, fontWeight: "bold"}} onClick={() =>setShowEditPopUp(false)}>{lang.todoPropEdit.buttons.close}</Button>
                    <Button sx={{fontFamily: lang.fontFamilyType, fontWeight: "bold"}} onClick={() => handleChangeTaskInfo(todo.id)}>{lang.todoPropEdit.buttons.edit}</Button>
                </DialogActions>
            </Dialog>
            {/* End Edit task popUp */}
    
            {/* Start delete task popUp */}
                <Dialog
                    open={showDeletePopUp}
                    sx={{fontFamily: lang.fontFamilyType}}
                    onClose={() => setShowDeletePopUp(false)}
                >
                    <DialogTitle id="alert-dialog-title" sx={{fontFamily: lang.fontFamilyType, textAlign: lang.textAligning}}>
                        {lang.todoDelete.header}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description" sx={{fontFamily: lang.fontFamilyType, textAlign: lang.textAligning}}>
                            {lang.todoDelete.message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setShowDeletePopUp(false)} sx={{fontFamily: lang.fontFamilyType}}>
                            {lang.todoDelete.buttons.close}
                        </Button>
                        <Button autoFocus onClick={() => handleDeleteTodo(todo.id)} sx={{fontFamily: lang.fontFamilyType}}>
                            {lang.todoDelete.buttons.delete}
                        </Button>
                    </DialogActions>
                </Dialog>
            {/* End delete task popUp */}

            {/* Start Task card */}
                <Card sx={{ background: "#1565c0", maxWidth: "98%"}} className="task-card">
                        <CardContent>
                            <Typography variant="h5" sx ={{color: "white"}}>
                                <Grid container spacing={2}>
                                    <Grid xs={7} style={{ textAlign: "right" }}>
                                        <Typography variant="h6" sx={{textAlign: lang.textAligning, fontFamily: lang.fontFamilyType,
                                                textDecoration: todo.isCompleted ? "line-through" : "none"}}>
                                            {todo.title}
                                        </Typography>
                                        <Typography variant="h6" sx={{textAlign: lang.textAligning, fontFamily: lang.fontFamilyType}}>
                                            {todo.disc}
                                        </Typography>
                                    </Grid>
                                    <Grid xs={5} display="flex" justifyContent="space-around" alignItems="center">
                                        <IconButton className="todo-option" sx={checkOption} onClick={() => handleTodoCheck(todo.id)}>
                                            <CheckIcon />
                                        </IconButton>
                                        <IconButton className="todo-option" sx={editOption} onClick={() => setShowEditPopUp(true)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton className="todo-option" sx={deleteOption} onClick={() => setShowDeletePopUp(true)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                            </Typography>                    
                        </CardContent>
                </Card>
            {/* End Task card */}
        </>
    );
}