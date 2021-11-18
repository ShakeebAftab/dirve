import {
  Box,
  Button,
  Container,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { useRef, useState } from "react";

// Components
import { FolderSelector } from "./FolderSelector";

// Dummy Data
import { folderNames } from "../dummy/folders";

const useStyles = makeStyles({
  paper: {
    padding: "20px",
    marginBottom: "10px",
  },
  title: {
    marginBottom: "8px",
    marginLeft: "5px",
  },
  input: {
    display: "none",
  },
});

export const Upload = () => {
  const classes = useStyles();

  // State
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [folder, setFolder] = useState(folderNames[0]);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Box overflow="hidden">
      <form>
        <Container maxWidth="md">
          <Paper className={classes.paper}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  color="textPrimary"
                  className={classes.title}
                >
                  Upload a new file
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  placeholder="Please enter the name of the file"
                  label="Name"
                  size="small"
                  fullWidth
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  placeholder="Please enter the description of the file (optional)"
                  label="Description"
                  size="small"
                  fullWidth
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </Grid>
              {folderNames.length > 0 ? (
                <>
                  <Grid item xs={12}>
                    <FolderSelector folder={folder} setFolder={setFolder} />
                  </Grid>
                  <Grid item xs={12}>
                    <input
                      type="file"
                      ref={inputRef}
                      className={classes.input}
                    />
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => inputRef?.current?.click()}
                    >
                      Select File
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" fullWidth variant="outlined">
                      Upload
                    </Button>
                  </Grid>
                </>
              ) : (
                <Grid item xs={12}>
                  <Typography variant="h6" color="error">
                    Please create a folder to upload files
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Container>
      </form>
    </Box>
  );
};
