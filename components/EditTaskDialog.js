import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { updateTaskMutation } from "../graphql/Mutations";
import { useMutation } from "@apollo/client";
import EditIcon from '@material-ui/icons/Edit';
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export const EditTaskDialog = ({ username, taskParam, startsAtParam, endsAtParam, idParam }) => {
    const [open, setOpen] = useState(false);
    const [task, setTask] = useState("");
    const [startsAt, setStartsAt] = useState();
    const [endsAt, setEndsAt] = useState();
    const [updateTask, { error, data }] = useMutation(updateTaskMutation);

    const handleClickOpen = () => {
        setOpen(true);
        setTask(taskParam);
        setStartsAt(startsAtParam);
        setEndsAt(endsAtParam);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const handleSave = async () => {
        if(task===""){
            alert("Enter a description for task")
            return
        }
        setOpen(false);

        await updateTask({
            variables: {
                id:idParam,
                task: task,
                startsAt: startsAt,
                endsAt: endsAt,
                username: username,
            },
        });
    };

    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
            >
                <EditIcon/>
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Edit Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        -Task (required): Add a description of the task you want to add.<br/>
                        -Starts at (required): Select the starting time for the task.<br/>
                        -Ends at (required): Select the ending time for the task. 
                    </DialogContentText>
                    <TextField
                        // value={taskParam}
                        required
                        autoFocus
                        margin="dense"
                        id="editTask"
                        label="Task"
                        fullWidth
                        value={task}
                        onChange={(e) => {
                            setTask(e.target.value);
                        }}
                    />
                    <br></br>
                    
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <TimePicker
                            clearable
                            ampm={false}
                            label="Starts at: "
                            value={startsAt}
                            onChange={
                                // console.log(moment(startsAt).format("HH:mm")),
                                setStartsAt}
                        />
                        <TimePicker
                            clearable
                            ampm={false}
                            label="Ends at: "
                            value={endsAt}
                            onChange={setEndsAt}
                        />
                    </MuiPickersUtilsProvider>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" >
                        Cancel
                    </Button>
                    <Button onClick={
                        handleSave
                        } color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
