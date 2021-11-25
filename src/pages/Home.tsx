import { Box, Grid } from "@material-ui/core";
import { useEffect, useContext } from "react";
import { ManageFolders } from "src/components/ManageFolders";
import { TabbedHeader } from "src/components/TabbedHeader";
import { Upload } from "src/components/Upload";
import { AuthContext } from "src/context/AuthContext";

export const Home = () => {
  const { AuthState } = useContext(AuthContext);

  useEffect(() => {
    AuthState({
      type: "SETUSERID",
      payload: null,
    });
  }, [AuthState]);

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
