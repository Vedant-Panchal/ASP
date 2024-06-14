import { useEffect, useReducer, useContext } from "react";
import { DirectoryContext } from "../../../context/DirectoryContext";

export const ACTIONS = {
  SELECT_FOLDER: "selectFolder",
  UPDATE_FOLDER: "updateFolder",
  SET_CHILD_FOLDERS: "setChildFolders",
  SET_CHILD_FILES: "setChildFiles",
};

export const ROOT_FOLDER = { name: "Home", id: null, path: [] };

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.SELECT_FOLDER:
      return {
        folderId: payload.folderId,
        folder: payload.folder,
        childFolders: [],
        childFiles: [],
      };

    case ACTIONS.UPDATE_FOLDER:
      return {
        ...state,
        folder: payload.folder,
      };

    case ACTIONS.SET_CHILD_FOLDERS:
      return {
        ...state,
        childFolders: payload.childFolders,
      };

    case ACTIONS.SET_CHILD_FILES:
      return {
        ...state,
        childFiles: payload.childFiles,
      };

    default:
      return state;
  }
}

function findFolderById(id, data) {
  if (id === null) return ROOT_FOLDER;
  for (const item of data) {
    if (item.id === id) return item;
    if (item.children && item.children.length > 0) {
      const nestedItem = findFolderById(id, item.children);
      if (nestedItem) return nestedItem;
    }
  }
  return null;
}

export function useFolder(folderId = null, folder = null) {
  const { tree } = useContext(DirectoryContext);

  const [state, dispatch] = useReducer(reducer, {
    folderId,
    folder,
    childFolders: [],
    childFiles: [],
  });

  useEffect(() => {
    dispatch({
      type: ACTIONS.SELECT_FOLDER,
      payload: { folderId, folder },
    });
  }, [folderId, folder, tree]);

  useEffect(() => {
    const selectedFolder = findFolderById(folderId, tree);
    if (selectedFolder) {
      dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: selectedFolder },
      });
    } else {
      dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
    }
  }, [folderId, tree]);

  useEffect(() => {
    let childFolders = [];
    if (folderId === null) {
      // If we're at the root, get all top-level folders
      childFolders = tree.filter(
        (item) => item.parentId === null && item.children,
      );
    } else {
      // If we're in a subfolder, find the current folder and get its children
      const currentFolder = findFolderById(folderId, tree);
      if (currentFolder && currentFolder.children) {
        childFolders = currentFolder.children.filter((child) => child.children);
      }
    }
    dispatch({
      type: ACTIONS.SET_CHILD_FOLDERS,
      payload: { childFolders },
    });
  }, [folderId, tree]);

  useEffect(() => {
    let childFiles = [];
    if (folderId === null) {
      // If we're at the root, get all top-level files
      childFiles = tree.filter(
        (item) => item.parentId === null && !item.children,
      );
    } else {
      // If we're in a subfolder, find the current folder and get its files
      const currentFolder = findFolderById(folderId, tree);
      if (currentFolder && currentFolder.children) {
        childFiles = currentFolder.children.filter((child) => !child.children);
      }
    }
    dispatch({
      type: ACTIONS.SET_CHILD_FILES,
      payload: { childFiles },
    });
  }, [folderId, tree]);

  return state;
}
