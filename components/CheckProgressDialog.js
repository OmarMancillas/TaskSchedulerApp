import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 30,
        borderRadius: 5,
        width:500
    },
    colorPrimary: {
        backgroundColor:
            theme.palette.grey[theme.palette.type === "light" ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: "#1a90ff",
    },
}))(LinearProgress);

var DateDiff = {

    inMinutes: function(d1, d2){
        d2.sets
        var t2 = d2.getTime()
        var t1 = d1.getTime()
        var diffMs = (t2 - t1);
        var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
        return parseInt((t2-t1)/(24*3600));
    },
}

export const CheckProgressDialog = ({startsAtParam, endsAtParam}) => {
    let startsAt = new Date(startsAtParam)
    startsAt.setSeconds(0)
    let endsAt = new Date(endsAtParam)
    endsAt.setSeconds(0)
    let total = DateDiff.inMinutes(startsAt, endsAt);
    let currentTime = new Date()
    currentTime.setSeconds(0)
    let elapsed = total - DateDiff.inMinutes(currentTime, endsAt)
    let progressed = 0

    if(endsAt<= currentTime){
        progressed = 100
    }else{
        progressed = (elapsed * 100) / total
    }
    const [open, setOpen] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [progress, setProgress] = React.useState(10);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) =>
                prevProgress >= 100 ? 1 : prevProgress + 1
            );
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <div>
            <Button
                color="primary"
                onClick={handleClickOpen}
            >
                <VisibilityIcon />
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Progress</DialogTitle>
                <DialogContent>
                    {Math.round(progressed)}%
                    <BorderLinearProgress variant="determinate" value={progressed} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Accept
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
