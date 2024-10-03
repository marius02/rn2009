import { createContext, ReactNode, useContext, useState } from "react";

interface UserData {
  username: string;
  role: string;
  token?: string;
};

interface AuthContextType {
  userData?: UserData;
  setUserData: (userData: UserData) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'useAuthContext must be used within an AuthContextProvider'
    );
  }
  return context;
};

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [userData, setUserData] = useState<UserData>();
  return (
    <AuthContext.Provider
      value={{
        userData,
        setUserData
      }
      }>
      {children}
    </AuthContext.Provider>
  )
}
