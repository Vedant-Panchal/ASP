import { db } from "../firebase";
import { collection, getDocs, setDoc, doc, DocumentData, QueryDocumentSnapshot } from "@firebase/firestore";
import DirectoryTree from "./directoryTree";

interface Folder extends DocumentData {
  id: string;
}

interface File extends DocumentData {
  id: string;
}

async function getAllFolders(): Promise<Folder[]> {
  const folders: Folder[] = [];
  const foldersRef = collection(db, "folders");
  const snapshot = await getDocs(foldersRef);
  snapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
    const folder = doc.data() as Folder;
    folder.id = doc.id;
    folders.push(folder);
  });

  return folders;
}

async function getAllFiles(): Promise<File[]> {
  const files: File[] = [];
  const filesRef = collection(db, "files");
  const snapshot = await getDocs(filesRef);
  snapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
    const file = doc.data() as File;
    file.id = doc.id;
    files.push(file);
  });
  return files;
}

async function buildTree(): Promise<void> {
  console.log("Building tree...");
  const folders = await getAllFolders();
  const files = await getAllFiles();

  const tree = new DirectoryTree();

  tree.createFiles(files.map(file => ({
    id: file.id,
    createdAt: file.createdAt || new Date(),
    folderId: file.folderId || null,
    name: file.name || '',
    url: file.url || ''
  })));

  tree.createFolders(folders.map(folder => ({
    id: folder.id,
    UserId: folder.UserId || '',
    createdAt: folder.createdAt || new Date(),
    name: folder.name || '',
    parentId: folder.parentId || null,
    path: folder.path || '',
    children: []
  })));
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
