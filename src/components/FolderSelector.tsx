import { MenuItem, TextField } from "@material-ui/core";
import { Dispatch, FC, useContext } from "react";
import { AppContext } from "src/context/AppContext";

interface Props {
  folder: string;
  setFolder: Dispatch<string>;
}

export const FolderSelector: FC<Props> = ({ folder, setFolder }) => {
  const { folderNames } = useContext(AppContext);

  return (
    <TextField
      variant="outlined"
      select
      label="Folder"
      fullWidth
      size="small"
      value={folder}
      onChange={(e) => setFolder(e.target.value)}
    >
      {folderNames?.map((folderName) => (
        <MenuItem key={folderName.id} value={folderName.name}>
          {folderName.name}
        </MenuItem>
      ))}
    </TextField>
  );
};
