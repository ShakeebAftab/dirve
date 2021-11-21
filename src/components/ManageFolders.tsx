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

// Dummy
import { folderNames } from "src/dummy/folders";

const useStyles = makeStyles({
  paper: {
    padding: "20px",
    marginBottom: "10px",
  },
  folderName: {
    marginTop: "2px",
  },
  delButton: {
    marginLeft: "5px",
  },
});

export const ManageFolders = () => {
  const classes = useStyles();
  return (
    <Box overflow="hidden">
      <Container maxWidth="md">
        <Paper className={classes.paper}>
          <form>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Box mb="8px" ml="5px">
                  <Typography variant="h5">Manage Folders</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Name"
                  placeholder="Please enter the folder name"
                  fullWidth
                  size="small"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="outlined"
                  color="primary"
                  fullWidth
                >
                  Create New Folder
                </Button>
              </Grid>
              {folderNames.length > 0 &&
                folderNames.map((folderName) => (
                  <Grid item xs={12} key={folderName}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      borderColor="#808080"
                      borderBottom="1px solid black"
                      p="5px"
                    >
                      <Typography
                        variant="body1"
                        className={classes.folderName}
                      >
                        {folderName}
                      </Typography>
                      <Box display="flex">
                        <Button variant="outlined" size="small" color="primary">
                          Rename
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          color="primary"
                          className={classes.delButton}
                        >
                          Delete
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                ))}
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};
