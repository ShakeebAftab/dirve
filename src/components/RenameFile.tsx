import { Dispatch, FC, useState, useContext } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import { AppContext } from "src/context/AppContext";

const getModalStyle = () => {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: "45vw",
      maxHeight: "40vh",
      overflow: "auto",
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      outline: "none",
    },
  })
);

interface Props {
  open: boolean;
  setOpen: Dispatch<boolean>;
  fileId: string;
}

export const RenameFile: FC<Props> = ({ open, setOpen, fileId }) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [name, setName] = useState("");

  const { AppState } = useContext(AppContext);

  const handleClose = () => setOpen(false);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    AppState({
      type: "RENAMEFILE",
      payload: {
        fileId,
        name,
      },
    });
    setName("");
    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <form>
            <Box padding="20px">
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <Typography variant="h6">Rename File</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    placeholder="Please enter the new file name"
                    fullWidth
                    variant="outlined"
                    size="small"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    focused
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                  >
                    Rename
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </form>
        </div>
      </Modal>
    </div>
  );
};
