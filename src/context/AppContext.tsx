import firebase from "firebase";
import {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { db, storageBucket } from "src/firebase";
import { AuthContext } from "./AuthContext";

interface CreateNewFolderType {
  name: string;
}

type UploadStatusType = "ERROR" | "ONGOING" | "SUCCESS";

interface AppStateType {
  type: "CREATEFOLDER" | "RENAMEFOLDER" | "DELETEFOLDER" | "UPLOADFILE";
  payload: any | CreateNewFolderType;
}

interface FolderType {
  id: string;
  name: string;
}

interface AppContextType {
  AppState: ({ type, payload }: AppStateType) => void;
  folderNames: FolderType[] | null;
  uploadStatus: UploadStatusType;
}

interface Props {
  children: ReactNode;
}

export const AppContext = createContext({} as AppContextType);

export const AppContextProvider: FC<Props> = ({ children }) => {
  const [folders, setFolders] = useState<FolderType[] | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatusType>("SUCCESS");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user?.dbId) return;
    db.collection("folders")
      .orderBy("timeStamp", "desc")
      .where("user", "==", user?.dbId)
      .onSnapshot((snapshot) => {
        const folders = snapshot.docs.map(
          (doc) =>
            doc.data().user === user?.dbId && {
              id: doc.id,
              name: doc.data().folderName,
            }
        );
        setFolders(folders.length > 0 ? (folders as FolderType[]) : null);
      });
  }, [user?.dbId]);

  const createNewFolder = async ({ name }: CreateNewFolderType) => {
    if (!user) return;
    let folderExists = false;
    folders?.forEach((folder) => folder.name === name && (folderExists = true));
    if (folderExists) return;
    // TODO: Error Handling
    const newFolder = await db.collection("folders").add({
      totItems: 0,
      folderName: name,
      user: user?.dbId,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
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

  interface UploadFileType {
    name: string;
    desc: string;
    folderName: string;
    file: Blob | Uint8Array | ArrayBuffer | null | any;
  }

  const uploadFile = async ({
    name,
    desc,
    folderName,
    file,
  }: UploadFileType) => {
    // TODO: Add uuid v4
    // TODO: Loading and Error edge cases
    setUploadStatus("ONGOING");
    if (!name || !folderName || !file || !user) return;
    const folder = folders?.find((folder) => folder.name === folderName);
    if (!folder) return;
    const storageRef = storageBucket.ref();
    const fileRef = storageRef.child(`${name}`);
    try {
      const uploadedFile = await fileRef.put(file);
      const fileURL = await uploadedFile.ref.getDownloadURL();
      await db.collection("files").add({
        name,
        desc,
        folderId: folder.id,
        fileURL,
        user: user.dbId,
        dbName: "",
        timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setUploadStatus("SUCCESS");
    } catch (error: any) {
      setUploadStatus("ERROR");
      console.log(error.message);
    }
  };

  const AppState = ({ type, payload }: AppStateType) => {
    switch (type) {
      case "CREATEFOLDER":
        return createNewFolder(payload as CreateNewFolderType);
      case "RENAMEFOLDER":
        return renameFolder(payload);
      case "DELETEFOLDER":
        return deleteFolder(payload);
      case "UPLOADFILE":
        return uploadFile(payload);
      // TODO: Delete File
      // TODO: Rename File
    }
  };

  return (
    <AppContext.Provider
      value={{ AppState, folderNames: folders, uploadStatus }}
    >
      {children}
    </AppContext.Provider>
  );
};
