import { Box, Grid } from "@material-ui/core";
import { Header } from "./components/Header";
import { ManageFolders } from "./components/ManageFolders";
import { Upload } from "./components/Upload";

export const App = () => {
  return (
    <Box overflow="hidden">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12}>
          <Upload />
        </Grid>
        <Grid item xs={12}>
          <ManageFolders />
        </Grid>
      </Grid>
    </Box>
  );
};
