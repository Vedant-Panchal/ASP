import { useState, createContext } from "react";

export const DirectoryContext = createContext();

export const DirectoryContextProvider = ({ children }) => {
  const [tree, setTree] = useState([]); //? Create a state variable to store the tree
  const value = { tree, setTree }; //? Create a value object which will be passed to the Provider

  return (
    <DirectoryContext.Provider value={value}>
      {children}
    </DirectoryContext.Provider>
  );
};
