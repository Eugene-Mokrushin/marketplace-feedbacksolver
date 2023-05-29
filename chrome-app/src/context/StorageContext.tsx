import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { User } from "firebase/auth";

interface StorageContextProps {
  uploadFileToStorage: (
    fileName: string,
    fileId: string,
    file: File,
    user: User
  ) => Promise<unknown>;
}

export const StorageContext = createContext<StorageContextProps>({
  uploadFileToStorage: () => Promise.resolve(),
});

export const StorageContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const storage = getStorage();

  const uploadFileToStorage = useCallback(
    async (fileName: string, fileId: string, file: File, user: User) => {
      const trueFilename = fileName.replace(/.xlsx/g, "");
      const storageRef = ref(storage, fileId);
      const metadata = {
        contentType: file.type,
        customMetadata: {
          uid: user.uid,
          fileName: trueFilename,
        },
      };
      await uploadBytes(storageRef, file, metadata);
    },
    [storage]
  );

  const contextValue = useMemo(
    () => ({ uploadFileToStorage }),
    [uploadFileToStorage]
  );

  return (
    <StorageContext.Provider value={contextValue}>
      {children}
    </StorageContext.Provider>
  );
};

export const UserStorage = () => {
  return useContext(StorageContext);
};
