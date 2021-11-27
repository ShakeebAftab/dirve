import { Box, Grid } from "@material-ui/core";
import { ManageFolders } from "src/components/ManageFolders";
import { TabbedHeader } from "src/components/TabbedHeader";
import { Upload } from "src/components/Upload";

export const Home = () => {
  return (
    <Box overflow="hidden">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TabbedHeader />
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
