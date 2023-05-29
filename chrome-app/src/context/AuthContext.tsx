import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { auth } from "../firebase";

interface UserContextProps {
  createUser: (email: string, password: string) => Promise<unknown>;
  user: User | null;
  logout: () => void;
  signIn: (email: string, password: string) => Promise<unknown>;
  changeUsername: (username: string) => Promise<unknown>;
  username: string;
}

export const UserContext = createContext<UserContextProps>({
  createUser: () => Promise.resolve(),
  user: null,
  logout: () => Promise.resolve(),
  signIn: () => Promise.resolve(),
  changeUsername: () => Promise.resolve(),
  username: "",
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState(user?.displayName ?? "");
  const provider = new GoogleAuthProvider();

  const createUser = useCallback(async (email: string, password: string) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    if (user?.email && auth.currentUser) {
      await updateProfile(auth.currentUser, {
        displayName: user.email.split("@")[0],
      });
      setUsername(user.email.split("@")[0]);
    }
  }, []);

  const changeUsername = useCallback(async (username: string) => {
    if (auth.currentUser && username !== auth.currentUser.displayName) {
      try {
        await updateProfile(auth.currentUser, {
          displayName: username,
        });
        setUsername(username);
      } catch (error) {
        console.error(error);
      }
    }
  }, []);

  const signIn = useCallback(
    async (email: string, password: string) => {
      await signInWithEmailAndPassword(auth, email, password);
      if (user?.displayName) {
        setUsername(user?.displayName);
      } else if (auth.currentUser?.email) {
        setUsername(auth.currentUser.email?.split("@")[0]);
      }
    },
    [user?.displayName]
  );

  const logout = useCallback(async () => {
    return await signOut(auth);
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.displayName) {
        setUsername(currentUser?.displayName);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const contextValue = useMemo(
    () => ({ createUser, user, logout, signIn, changeUsername, username }),
    [createUser, user, logout, signIn, changeUsername, username]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
