import React, { useEffect, useState } from "react";
import app from "./Firebase";
import { getAuth } from "firebase/auth";

export const AuthContext = React.createContext();
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const auth = getAuth();
  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
