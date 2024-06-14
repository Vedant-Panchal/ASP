import { createContext } from "react";

export const DirectoryContext = createContext();

export const DirectoryContextProvider = ({ children }) => {
  const value = {}; //? Create a value object which will be passed to the Provider

  return (
    <DirectoryContext.Provider value={value}>
      {children}
    </DirectoryContext.Provider>
  );
};
