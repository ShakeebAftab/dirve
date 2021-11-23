import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { db } from "src/firebase";
import { AuthContext } from "./AuthContext";

interface AppStateType {
  type: string;
  payload: any;
}

interface FolderType {
  id: string;
  name: string;
}

interface AppContextType {
  AppState: ({ type, payload }: AppStateType) => void;
  folderNames: FolderType[] | null;
}

interface Props {
  children: ReactNode;
}

export const AppContext = createContext({} as AppContextType);

export const AppContextProvider: FC<Props> = ({ children }) => {
  const [folders, setFolders] = useState<FolderType[] | null>(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    console.log("running");
    db.collection("folders").onSnapshot((snapshot) => {
      const folders = snapshot.docs.map(
        (doc) =>
          doc.data().user === user?.dbId && {
            id: doc.id,
            name: doc.data().folderName,
          }
      );
      setFolders(folders.length > 0 ? (folders as FolderType[]) : null);
    });
  }, [user]);

  const createNewFolder = async ({ name }: any) => {
    const newFolder = await db.collection("folders").add({
      totItems: 0,
      folderName: name,
      user: user?.dbId,
    });
    setFolders((folders) =>
      folders
        ? [
            ...folders,
            {
              id: newFolder.id,
              name,
            },
          ]
        : [
            {
              id: newFolder.id,
              name,
            },
          ]
    );
  };

  const renameFolder = ({ id, newName }: any) => {};
  const deleteFolder = ({ id }: any) => {};

  const AppState = ({ type, payload }: AppStateType) => {
    switch (type) {
      case "CREATEFOLDER":
        return createNewFolder(payload);
      case "RENAMEFOLDER":
        return renameFolder(payload);
      case "DELETEFOLDER":
        return deleteFolder(payload);
    }
  };

  return (
    <AppContext.Provider value={{ AppState, folderNames: folders }}>
      {children}
    </AppContext.Provider>
  );
};
