import React, { createContext, useContext } from 'react';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const ApiContext = createContext({ apiUrl: API });

export const ApiProvider = ({ children }) => (
  <ApiContext.Provider value={{ apiUrl: API }}>
    {children}
  </ApiContext.Provider>
);

export const useApi = () => useContext(ApiContext);