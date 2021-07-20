import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
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
                // variant="outlined"
                color="secondary"
                onClick={handleClickOpen}
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
