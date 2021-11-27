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
  folderId: string;
  folderName: string;
}

export const DeleteFolder: FC<Props> = ({
  open,
  setOpen,
  folderId,
  folderName,
}) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [name, setName] = useState("");
  const [error, setError] = useState(false);

  const { AppState } = useContext(AppContext);

  const handleClose = () => setOpen(false);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (name !== folderName) return setError(true);
    AppState({
      type: "DELETEFOLDER",
      payload: { folderId },
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
                  <Typography variant="h6">Delete Folder</Typography>
                  <Typography variant="body2">
                    All the files in the folder will also be deleted with the
                    folder
                  </Typography>
                </Grid>
                {error && (
                  <Grid item xs={12}>
                    <Typography variant="body1" color="error">
                      Please enter the {folderName} correctly
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <TextField
                    label="Name"
                    placeholder={`Please enter "${folderName}" to delete it`}
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
                    Delete
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
