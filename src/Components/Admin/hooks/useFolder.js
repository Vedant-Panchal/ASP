import React, { useEffect, useReducer } from "react";
import { db } from "../../../firebase";
import {
  collection,
  doc,
  getDoc,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
export const ACTIONS = {
  SELECT_FOLDER: "selectFolder",
  UPDATE_FOLDER: "updateFolder",
  SET_CHILD_FOLDERS: "setchildFolders",
  SET_CHILD_FILES: "setchildFiles",
};
//setting the current folder id
const formatedDoc = (doc) => {
  return { id: doc.id, ...doc.data() };
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
    if (folderId == null) {
      return dispatch({
        type: ACTIONS.UPDATE_FOLDER,
        payload: { folder: ROOT_FOLDER },
      });
    }

    getDoc(doc(db, "folders", folderId))
      .then((doc) => {
        //getting the current folder we are on!
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: formatedDoc(doc) },
        });
      })
      .catch(() => {
        dispatch({
          type: ACTIONS.UPDATE_FOLDER,
          payload: { folder: ROOT_FOLDER },
        });
      });
  }, [folderId]);

  useEffect(() => {
    return onSnapshot(
      query(
        collection(db, "folders"),
        where("parentId", "==", folderId),
        orderBy("createdAt"),
      ),
      (snapshot) => {
        dispatch({
          type: ACTIONS.SET_CHILD_FOLDERS,
          payload: { childFolders: snapshot.docs.map(formatedDoc) },
        });
      },
    );
  }, [folderId]);

  //get files
  useEffect(() => {
    return onSnapshot(
      query(
        collection(db, "files"),
        where("folderId", "==", folderId),
        // orderBy("createdAt")
      ),
      (snapshot) => {
        dispatch({
          type: ACTIONS.SET_CHILD_FILES,
          payload: { childFiles: snapshot.docs.map(formatedDoc) },
        });
      },
    );
  }, [folderId]);
  return state;
}
