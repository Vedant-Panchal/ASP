import { db } from "../firebase";
import { collection, getDocs, setDoc, doc } from "firebase/firestore";
import DirectoryTree from "./directoryTree";

async function getAllFolders() {
  const folders = [];
  const foldersRef = collection(db, "folders");
  const snapshot = await getDocs(foldersRef);
  snapshot.forEach((doc) => {
    const folder = doc.data();
    folder.id = doc.id;
    folders.push(folder);
  });

  return folders;
}

async function getAllFiles() {
  const files = [];
  const filesRef = collection(db, "files");
  const snapshot = await getDocs(filesRef);
  snapshot.forEach((doc) => {
    const file = doc.data();
    file.id = doc.id;
    files.push(file);
  });
  return files;
}

async function buildTree() {
  console.log("Building tree...");
  const folders = await getAllFolders();
  const files = await getAllFiles();

  const tree = new DirectoryTree();

  tree.createFiles(files);
  tree.createFolders(folders);
  tree.addFilesToFolder();
  tree.createTree();

  const finalTree = tree.getTree();

  //* Serialize the tree to JSON
  const jsonTree = JSON.stringify(finalTree);
  console.log("Tree built:", JSON.parse(jsonTree));

  //* Save the tree to Firestore
  const treeRef = doc(db, "trees", new Date().toISOString());
  await setDoc(treeRef, { tree: jsonTree, createdAt: new Date() });
  console.log("Tree built and saved to Firestore");
}

export default buildTree;
