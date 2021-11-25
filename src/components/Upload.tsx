import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import prettyBytes from "pretty-bytes";

// Components
import { FolderSelector } from "./FolderSelector";

// Static
import fileIcon from "../static/fileIcon.png";
import { AppContext } from "src/context/AppContext";

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

  const { AppState, folderNames, uploadStatus } = useContext(AppContext);

  // State
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [folder, setFolder] = useState<any>(
    folderNames && folderNames.length > 0 ? folderNames[0].name : ""
  );
  const [file, setFile] = useState<
    Blob | Uint8Array | ArrayBuffer | null | any
  >(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploadCount, setUploadCount] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

  useEffect(() => {
    setLoading(uploadStatus === "ONGOING");
    setSuccess(uploadStatus === "SUCCESS");
  }, [uploadStatus]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!file || !folder) return;
    AppState({
      type: "UPLOADFILE",
      payload: {
        name: name === "" ? file.name : name,
        desc,
        folderName: folder,
        file,
      },
    });
    setName("");
    setDesc("");
    setFile(null);
    setUploadCount((uploadCount) => uploadCount + 1);
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
              {folderNames ? (
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
                      onClick={(e) => handleSubmit(e)}
                    >
                      Upload
                    </Button>
                  </Grid>
                  {loading ? (
                    <Grid item xs={12}>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        p="10px"
                      >
                        <CircularProgress color="primary" />
                      </Box>
                    </Grid>
                  ) : (
                    uploadCount > 0 &&
                    (success ? (
                      <Grid item xs={12}>
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          p="10px"
                        >
                          <Typography variant="body1" color="primary">
                            File uploaded successfully!
                          </Typography>
                        </Box>
                      </Grid>
                    ) : (
                      <Grid item xs={12}>
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          p="10px"
                        >
                          <Typography variant="body1" color="error">
                            Error! Please try again later.
                          </Typography>
                        </Box>
                      </Grid>
                    ))
                  )}
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
