import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { auth, db } from "src/firebase";

interface UserType {
  dbId?: string | null | undefined;
  name: string | null | undefined;
  email: string | null | undefined;
}

interface SignUpUserType {
  name: string;
  email: string;
  password: string;
}

interface LoginUserType {
  email: string;
  password: string;
}

interface AuthStateType {
  type: "SIGNUP" | "SIGNIN" | "SIGNOUT" | "SETUSERID";
  payload: SignUpUserType | LoginUserType | null;
}

interface AuthContextType {
  user: UserType | null;
  AuthState: ({ type, payload }: AuthStateType) => void;
}

interface AuthContextProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider: FC<AuthContextProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);

  const signUpNewUser = async ({ name, email, password }: SignUpUserType) => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      await auth.currentUser?.updateProfile({ displayName: name });
      const dbUser = await db.collection("users").add({
        name,
        email,
      });
      setUser({
        dbId: dbUser.id,
        name,
        email,
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const signInUser = async (payload: LoginUserType) => {
    const { email, password } = payload;
    try {
      const user = await auth.signInWithEmailAndPassword(email, password);
      setUser({
        name: user.user?.displayName,
        email: user.user?.email,
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const signOutUser = () => {
    auth.signOut();
    setUser(null);
  };

  const setUserId = async () => {
    const dataUser = await db
      .collection("users")
      .where("email", "==", user?.email)
      .get();
    const data = dataUser.docs[0].id;
    setUser({
      dbId: data,
      name: user?.name,
      email: user?.email,
    });
  };

  const AuthState = ({ type, payload }: AuthStateType) => {
    switch (type) {
      case "SIGNUP":
        return signUpNewUser(payload as SignUpUserType);
      case "SIGNIN":
        return signInUser(payload as LoginUserType);
      case "SIGNOUT":
        return signOutUser();
      case "SETUSERID":
        return setUserId();
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (!authUser) return;
      setUser({
        name: authUser.displayName,
        email: authUser.email,
      });
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, AuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
