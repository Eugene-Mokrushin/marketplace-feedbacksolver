import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ref, set, child, get, onValue, getDatabase } from "firebase/database";
import { db } from "../firebase";
import { UserAuth } from "./AuthContext";
import { FileRef, InitalUserData } from "../types";
import { User } from "firebase/auth";

interface DBContextProps {
  changeUsername: (
    userId: string,
    name: string,
    email: string
  ) => Promise<unknown>;
  uploadFileData: (fileId: string, fileData: object) => Promise<unknown>;
  initalUserData: InitalUserData;
  changeFileName: (
    userId: string,
    fileId: string,
    newName: string
  ) => Promise<unknown>;
}

export const DBContext = createContext<DBContextProps>({
  changeUsername: () => Promise.resolve(),
  uploadFileData: () => Promise.resolve(),
  changeFileName: () => Promise.resolve(),
  initalUserData: {
    email: "",
    name: "",
    tokenB: 0,
    tokenP: 0,
    plan: "Basic",
    files: [],
  },
});

export const DBContextProvider = ({ children }: { children: ReactNode }) => {
  const [initalUserData, setInitalUserData] = useState<InitalUserData>({
    email: "",
    name: "",
    tokenB: 0,
    tokenP: 0,
    plan: "Basic",
    files: [],
  });
  const { user } = UserAuth();
  const changeUsername = useCallback(
    async (userId: string, name: string, email: string) => {
      await set(ref(db, "users/" + userId), {
        username: name,
        email: email,
      });
    },
    []
  );

  useEffect(() => {
    const userId = user?.uid ? user?.uid : null;
    const tokenBRef = ref(db, "users/" + userId);
    const unsubscribe = onValue(tokenBRef, (snapshot) => {
      const data = snapshot.val();
      setInitalUserData(data);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  const uploadFileData = useCallback(
    async (fileId: string, fileData: object) => {
      await set(ref(db, "files/" + fileId), {
        data: fileData,
      });
    },
    []
  );

  const changeFileName = useCallback(
    async (userId: string, fileId: string, newName: string) => {
      const filesRef = ref(db, "users/" + userId + "/files");
      try {
        await get(filesRef).then((snapshot) => {
          const files: FileRef[] = snapshot.val();
          const updatedFiles: FileRef[] = [];
          for (const element of files) {
            if (element.fileId === fileId) {
              updatedFiles.push({
                ...element,
                name: newName,
              });
            } else {
              updatedFiles.push(element);
            }
          }
          set(filesRef, updatedFiles);
        });
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  const contextValue = useMemo(
    () => ({ changeUsername, uploadFileData, initalUserData, changeFileName }),
    [changeUsername, uploadFileData, initalUserData, changeFileName]
  );

  return (
    <DBContext.Provider value={contextValue}>{children}</DBContext.Provider>
  );
};

export const UserDB = () => {
  return useContext(DBContext);
};
