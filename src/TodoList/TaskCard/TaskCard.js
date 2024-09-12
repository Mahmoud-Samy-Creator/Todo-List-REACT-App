import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


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

export default function TaskCard({ todo, lang, openDeletePopUp, openEditPopUp, dispatch }) {
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
    // Handle check a todo as completed
    function handleTodoCheck(id) {
        dispatch({ type: "markComplete", payload: { taskId: id } });
    }

    // Handle show and disappear delete pop up
    function handleShowDeletePopup() {
        openDeletePopUp(todo)
    }
    // Handle show and disappear Edit pop up
    function handleShowEditPopup() {
        openEditPopUp(todo)
    }

    
    return(
        <>
            {/* Start Edit task popUp */}
            
            {/* End Edit task popUp */}

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
                                        <IconButton className="todo-option" sx={editOption} onClick={handleShowEditPopup}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton className="todo-option" sx={deleteOption} onClick={handleShowDeletePopup}>
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