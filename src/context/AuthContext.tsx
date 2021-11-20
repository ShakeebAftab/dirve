import { createContext, FC, ReactNode, useState } from "react";
import { auth, db } from "src/firebase";

interface UserType {
  dbId?: string;
  name: string | null | undefined;
  email: string | null | undefined;
}

interface AuthContextType {
  user: UserType | null;
  AuthState: (type: string, payload: any) => void;
}

export const AuthContext = createContext({} as AuthContextType);

interface AuthContextProps {
  children: ReactNode;
}

export const AuthContextProvider: FC<AuthContextProps> = ({ children }) => {
  interface SignUpUserType {
    name: string;
    email: string;
    password: string;
  }

  interface LoginUserType {
    email: string;
    password: string;
  }

  const [user, setUser] = useState<UserType | null>(null);

  const signUpNewUser = async (payload: SignUpUserType) => {
    const { name, email, password } = payload;
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

  const AuthState = (type: string, payload: any) => {
    switch (type) {
      case "SIGNUP":
        signUpNewUser(payload);
        break;
      case "SIGNIN":
        signInUser(payload);
        break;
    }
  };

  return (
    <AuthContext.Provider value={{ user, AuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
