import { MenuItem, TextField } from "@material-ui/core";
import { Dispatch, FC } from "react";
import { folderNames } from "src/dummy/folders";

interface Props {
  folder: string;
  setFolder: Dispatch<string>;
}

export const FolderSelector: FC<Props> = ({ folder, setFolder }) => {
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
      {folderNames.map((folderName: string) => (
        <MenuItem key={folderName} value={folderName}>
          {folderName}
        </MenuItem>
      ))}
    </TextField>
  );
};
