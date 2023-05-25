import React, {
  JSXElementConstructor,
  ReactElement,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { auth } from "../firebase";
import { UserInfo } from "firebase/auth";

// @ts-ignore
const AuthContext = React.createContext();

interface AuthProviderProps {
  children: ReactElement<any, string | JSXElementConstructor<any>>;
}

interface AuthContextValue {
  currentUser: UserInfo | null;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);

  async function signup(email: string, password: string) {
    return await auth.createUserWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = useMemo(() => ({ currentUser, signup }), [currentUser]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
