import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { deleteTaskMutation } from "../graphql/Mutations";
import { useMutation } from "@apollo/client";
import DeleteIcon from '@material-ui/icons/Delete';

export const DeleteTaskDialog = ({username, idParam}) => {
    const [open, setOpen] = useState(false);
    const [deleteTask, { error, data }] = useMutation(deleteTaskMutation);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = async () => {
        setOpen(false);

        await deleteTask({
            variables: {
                id: idParam,
                username: username,
            },
        });
        window.location.reload()
    };

    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
            >
                <DeleteIcon/>
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">
                    Are you sure you want to delete?
                </DialogTitle>
                <DialogContent></DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
