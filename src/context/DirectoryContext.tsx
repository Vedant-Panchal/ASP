import { createContext, useState } from "react";
import { FileNode, FolderNode } from "../utils/directoryTree";

interface DirectoryContextValue {
  tree: (FileNode | FolderNode)[];
  setTree: React.Dispatch<React.SetStateAction<(FileNode | FolderNode)[]>>;
}

interface DirectoryContextProviderProps {
  children: React.ReactNode;
}

export const DirectoryContext = createContext<DirectoryContextValue>({
  tree: [],
  setTree: () => {},
});

export const DirectoryContextProvider: React.FC<DirectoryContextProviderProps> = ({ children }) => {
  const [tree, setTree] = useState<(FileNode | FolderNode)[]>([]);

  return (
    <DirectoryContext.Provider value={{ tree, setTree }}>
      {children}
    </DirectoryContext.Provider>
  );
};
