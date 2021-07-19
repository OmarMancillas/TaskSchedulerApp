import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { createTaskMutation } from "../graphql/Mutations";
import { useMutation } from "@apollo/client";
import { MuiPickersUtilsProvider, TimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { signOut } from "next-auth/client";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

export const SignOutDialog = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                variant="outlined"
                color="primary"
                onClick={handleClickOpen}
                // style={styles.MuiBottomNavigation}
            >
                SignOut
                <ExitToAppIcon />
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Proceed?</DialogTitle>
                <DialogContent></DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={() =>
                            signOut({
                                callbackUrl: "http://localhost:3000/login",
                            })
                        }
                        color="primary"
                    >
                        Accept
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
