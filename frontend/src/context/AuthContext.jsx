import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const tokenFromEnv = import.meta.env.VITE_ADMIN_TOKEN || '';
  const [token, setToken] = useState(tokenFromEnv || null);
  const [user, setUser] = useState(null);

  const login = ({ token, user } = {}) => {
    if (token) setToken(token);
    if (user) setUser(user);
  };
  const logout = () => {
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
