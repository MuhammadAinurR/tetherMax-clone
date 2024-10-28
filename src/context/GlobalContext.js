"use client";
import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();
const AuthContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [state, setState] = useState({});

  return (
    <GlobalContext.Provider value={{ state, setState }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    // Check for token in localStorage on mount
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // Set auth state to true if token exists
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const CombinedProvider = ({ children }) => {
  return (
    <GlobalProvider>
      <AuthProvider>{children}</AuthProvider>
    </GlobalProvider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
