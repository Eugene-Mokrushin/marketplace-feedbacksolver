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

interface DBContextProps {
  changeUsername: (
    userId: string,
    name: string,
    email: string
  ) => Promise<unknown>;
}

export const DBContext = createContext<DBContextProps>({
  changeUsername: () => Promise.resolve(),
});

export const DBContextProvider = ({ children }: { children: ReactNode }) => {
  // const [username, setUsername] = useState("");
  const { user } = UserAuth();

  // useEffect(() => {
  //   const fetchUsername = async () => {
  //     if (user) {
  //       const userId = user?.uid || "";
  //       const userRef = ref(db, "users/" + userId);
  //       onValue(userRef, async (snapshot) => {
  //         const data = await snapshot.val();
  //         setUsername(data.username);
  //       });
  //     }
  //   };

  //   fetchUsername();
  // }, [user]);

  const changeUsername = useCallback(
    async (userId: string, name: string, email: string) => {
      await set(ref(db, "users/" + userId), {
        username: name,
        email: email,
      });
    },
    []
  );

  const setupAccount = useCallback(
    async (userId: string, name: string, email: string) => {
      await set(ref(db, "users/" + userId), {
        username: name,
        email: email,
        tokenB: 100,
        tokenP: 50,
      });
    },
    []
  );

  const contextValue = useMemo(() => ({ changeUsername }), [changeUsername]);

  return (
    <DBContext.Provider value={contextValue}>{children}</DBContext.Provider>
  );
};

export const UserDB = () => {
  return useContext(DBContext);
};
