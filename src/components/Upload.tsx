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
import { ChangeEvent, useRef, useState } from "react";

// Components
import { FolderSelector } from "./FolderSelector";

// Static
import fileIcon from "../static/fileIcon.png";

// Dummy Data
import { folderNames } from "../dummy/folders";
import prettyBytes from "pretty-bytes";

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
  fileInfo: {
    fontWeight: "bold",
  },
});

export const Upload = () => {
  const classes = useStyles();

  // State
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [folder, setFolder] = useState(
    folderNames.length > 0 ? folderNames[0] : ""
  );
  const [file, setFile] = useState<
    Blob | Uint8Array | ArrayBuffer | null | any
  >(null);

  const inputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

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
              {folderNames.length > 0 ? (
                <>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      placeholder="Please enter the name of the file (optional)"
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
                  <Grid item xs={12}>
                    <FolderSelector folder={folder} setFolder={setFolder} />
                  </Grid>
                  <Grid item xs={12}>
                    <input
                      type="file"
                      ref={inputRef}
                      className={classes.input}
                      onChange={(e) => onFileChange(e)}
                    />
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => inputRef?.current?.click()}
                      color="primary"
                    >
                      Select File
                    </Button>
                  </Grid>
                  {file && (
                    <Grid item xs={12}>
                      <Box
                        display="flex"
                        p="20px"
                        borderRadius={25}
                        style={{ background: "#ededed" }}
                        textOverflow="wrap"
                        overflow="scroll"
                      >
                        <img
                          src={fileIcon}
                          alt="file uploaded icon"
                          style={{ objectFit: "contain" }}
                        />
                        <Box pt="25px" marginLeft="10px" textOverflow="wrap">
                          <Typography variant="body1">
                            <span className={classes.fileInfo}>
                              Original File Name:
                            </span>{" "}
                            {file.name}
                          </Typography>
                          <Typography variant="body1">
                            <span className={classes.fileInfo}>File Size:</span>{" "}
                            {prettyBytes(file.size)}
                          </Typography>
                          <Typography variant="body1">
                            <span className={classes.fileInfo}>File Type:</span>{" "}
                            {file.type}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="outlined"
                      color="primary"
                    >
                      Upload
                    </Button>
                  </Grid>
                </>
              ) : (
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="center">
                    <Typography variant="h6" color="error">
                      Please create a folder to upload files
                    </Typography>
                  </Box>
                </Grid>
              )}
            </Grid>
          </Paper>
        </Container>
      </form>
    </Box>
  );
};
