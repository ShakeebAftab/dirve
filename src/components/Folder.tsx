import { Box } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { AuthContext } from "src/context/AuthContext";
import { db } from "src/firebase";
import { FolderTable } from "./FolderTable";

export const Folder = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const [files, setFiles] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    db.collection("files")
      .where("user", "==", user.dbId)
      .where("folderId", "==", id)
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) => {
        setFiles(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().name,
            desc: doc.data().desc,
            fileURL: doc.data().fileURL,
            dbName: doc.data().dbName,
          }))
        );
      });
  }, [id, user]);

  return <Box overflow="hidden">{files && <FolderTable files={files} />}</Box>;
};
