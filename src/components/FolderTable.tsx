import { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { FC } from "react";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { AppContext } from "src/context/AppContext";
import { RenameFile } from "./RenameFile";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  button: {
    marginLeft: "5px",
  },
});

interface Props {
  files: any[];
}

export const FolderTable: FC<Props> = ({ files }) => {
  const classes = useStyles();

  const [fileId, setFileId] = useState("");
  const [searchFiles, setSearchFiles] = useState<any[]>([]);
  const [searchFlag, setSearchFlag] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  const { AppState } = useContext(AppContext);

  const handleDelete = (fileId: string, fileName: string) => {
    AppState({
      type: "DELETEFILE",
      payload: {
        fileId,
        fileName,
      },
    });
  };

  const handleRenameClick = (fileId: string) => {
    setFileId(fileId);
    setOpen(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setName(e.target.value);
    if (e.target.value === "") return setSearchFlag(false);
    setSearchFlag(true);
    setSearchFiles(() =>
      files.filter((file) =>
        file.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  return (
    <>
      <Box p="20px">
        <TextField
          variant="outlined"
          fullWidth
          label="Search"
          placeholder="Please enter the file name"
          size="small"
          value={name}
          onChange={(e) => handleChange(e)}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableBody>
            {(searchFlag ? searchFiles : files).map((file: any) => (
              <TableRow key={file.id}>
                <TableCell component="th" scope="row">
                  <Typography variant="body1" color="textPrimary">
                    {file.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {file.desc}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Button variant="outlined" color="primary">
                    Download
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                    onClick={() => handleRenameClick(file.id)}
                  >
                    Rename
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                    onClick={() => handleDelete(file.id, file.dbName)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <RenameFile
        open={open}
        setOpen={setOpen}
        fileId={fileId}
        isFolder={false}
      />
    </>
  );
};
