import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createTaskMutation } from "./../graphql/Mutations";
import { useMutation } from "@apollo/client";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

export const NewTaskDialog = ({ username }) => {
    const [open, setOpen] = useState(false);
    const [task, setTask] = useState("");
    const [startsAt, setStartsAt] = useState(new Date());
    const [endsAt, setEndsAt] = useState(new Date());
    const [createTask, { error, data }] = useMutation(createTaskMutation);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAdd = async () => {
        if (task === "") {
            alert("Enter a description for task");
            return;
        }
        setOpen(false);

        await createTask({
            variables: {
                task: task,
                startsAt: startsAt,
                endsAt: endsAt,
                username: username,
            },
        });
        window.location.reload();
    };

    return (
        <div>
            <>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleClickOpen}
                >
                    Add new task
                </Button>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">
                        Add new task
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            -Task (required): Add a description of the task you
                            want to add.
                            <br />
                            -Start at (required): Select the starting time for
                            the task.
                            <br />
                            -Ends at (required): Select the ending time for the
                            task.
                        </DialogContentText>
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="newTask"
                            label="Task"
                            fullWidth
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
                                onChange={setStartsAt}
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
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleAdd} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        </div>
    );
};
