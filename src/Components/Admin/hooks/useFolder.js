import React, { useEffect, useReducer } from "react";

export const ACTIONS = {
  SELECT_FOLDER: "selectFolder",
  UPDATE_FOLDER: "updateFolder",
  SET_CHILD_FOLDERS: "setChildFolders",
  SET_CHILD_FILES: "setChildFiles",
};

export const ROOT_FOLDER = { name: "Home", id: null, path: [] };

const folderData = [
  {
    id: "PSXXabzVNlg5nw56HbEA",
    UserId: "",
    createdAt: "",
    name: "Practical",
    parentId: null,
    path: [],
    children: [],
  },
  {
    id: "UGlJE86RQQzBV7pyHWfj",
    UserId: "randomValueHere",
    createdAt: "14/6/2024, 1:09:21 pm",
    name: "Dummy Folder",
    parentId: null,
    path: [],
    children: [
      {
        id: "bJBLtplahTAfeBzpVzpV",
        createdAt: "",
        folderId: "UGlJE86RQQzBV7pyHWfj",
        name: "file_name",
        url: "https://firebasestorage.googleapis.com/v0/b/asp2024-5525f.appspot.com/o/Home%2FBATCH%202022-2026%2FSEM-2%2FBE%2FUNIT-1%2FModule%201_Special%20Diode.pdf?alt=media&token=29b8f9f6-fa6c-495d-949e-872277fa0b01",
      },
      {
        id: "gtL2eQ7BcZCQWQibYJbR",
        UserId: "",
        createdAt: "",
        name: "Nested Folder",
        parentId: "UGlJE86RQQzBV7pyHWfj",
        path: [""],
        children: [
          {
            id: "uyp7BMYDf0lJvsQrCbGf",
            UserId: "",
            createdAt: "",
            name: "Meow Meow",
            parentId: "gtL2eQ7BcZCQWQibYJbR",
            path: [""],
            children: [],
          },
        ],
      },
    ],
  },
  {
    id: "iSSSgRjcL445IpppRbjQ",
    createdAt: "",
    folderId: null,
    name: "Hello Kitty",
    url: "meowmeo",
  },
];

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
  for (const folder of data) {
    if (folder.id === id) return folder;
    if (folder.children && folder.children.length > 0) {
      const childFolder = findFolderById(id, folder.children);
      if (childFolder) return childFolder;
    }
  }
  return null;
}

export function useFolder(folderId = null, folder = null) {
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
  }, [folderId, folder]);

  useEffect(() => {
    const selectedFolder = findFolderById(folderId, folderData);
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
  }, [folderId]);

  useEffect(() => {
    const childFolders = folderData.filter(
      (folder) => folder.parentId === folderId,
    );
    dispatch({
      type: ACTIONS.SET_CHILD_FOLDERS,
      payload: { childFolders },
    });
  }, [folderId]);

  useEffect(() => {
    const currentFolder = findFolderById(folderId, folderData);
    if (currentFolder && currentFolder.children) {
      const childFiles = currentFolder.children.filter(
        (child) => !child.children,
      );
      dispatch({
        type: ACTIONS.SET_CHILD_FILES,
        payload: { childFiles },
      });
    }
  }, [folderId]);

  return state;
}
