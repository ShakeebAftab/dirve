import { Box, Grid } from "@material-ui/core";
import { TabbedHeader } from "src/components/TabbedHeader";
import { Folder as FolderComp } from "src/components/Folder";

export const Folder = () => {
  return (
    <Box overflow="hidden">
      <Grid container>
        <Grid item xs={12}>
          <TabbedHeader />
        </Grid>
        <Grid item xs={12}>
          <FolderComp />
        </Grid>
      </Grid>
    </Box>
  );
};
