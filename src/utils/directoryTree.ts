interface IFolderNode {
  id: string;
  UserId: string;
  createdAt: Date;
  name: string;
  parentId: string | null;
  path: string;
  children: (IFolderNode | IFileNode)[];
}

interface IFileNode {
  id: string;
  createdAt: Date;
  folderId: string | null;
  name: string;
  url: string;
}

export class FolderNode implements IFolderNode {
  id: string;
  UserId: string;
  createdAt: Date;
  name: string;
  parentId: string | null;
  path: string;
  children: (FolderNode | FileNode)[];

  constructor(id: string, UserId: string, createdAt: Date, name: string, parentId: string | null, path: string) {
    this.id = id;
    this.UserId = UserId;
    this.createdAt = createdAt;
    this.name = name;
    this.parentId = parentId;
    this.path = path;
    this.children = [];
  }
}

export class FileNode implements IFileNode {
  id: string;
  createdAt: Date;
  folderId: string | null;
  name: string;
  url: string;

  constructor(id: string, createdAt: Date, folderId: string | null, name: string, url: string) {
    this.id = id;
    this.createdAt = createdAt;
    this.folderId = folderId;
    this.name = name;
    this.url = url;
  }
}

class DirectoryTree {
  private rootFolder: (FolderNode | FileNode)[];
  private children: (FolderNode | FileNode)[];
  private filesArr: FileNode[];
  private folderArr: FolderNode[];

  constructor() {
    this.rootFolder = [];
    this.children = [];
    this.filesArr = [];
    this.folderArr = [];
  }

  createFiles(files: IFileNode[]): void {
    files.forEach((file) => {
      const newFile = new FileNode(
        file.id,
        file.createdAt,
        file.folderId,
        file.name,
        file.url,
      );
      this.filesArr.push(newFile);
    });
  }

  createFolders(folders: IFolderNode[]): void {
    folders.forEach((folder) => {
      const newFolder = new FolderNode(
        folder.id,
        folder.UserId,
        folder.createdAt,
        folder.name,
        folder.parentId,
        folder.path,
      );
      this.folderArr.push(newFolder);
    });
  }

  addFilesToFolder(): void {
    this.filesArr.forEach((file) => {
      this.folderArr.forEach((folder) => {
        if (folder.id === file.folderId) {
          folder.children.push(file);
        }
      });
    });
  }

  createTree(): void {
    this.folderArr.forEach((folder) => {
      if (folder.parentId === null) {
        this.rootFolder.push(folder);
      } else {
        this.folderArr.forEach((f) => {
          if (f.id === folder.parentId) {
            f.children.push(folder);
          }
        });
      }
    });

    // Add all files which have no parentID to the root folder
    this.filesArr.forEach((file) => {
      if (file.folderId === null) {
        this.rootFolder.push(file);
      }
    });
  }

  getTree(): (FolderNode | FileNode)[] {
    return this.rootFolder;
  }
}

export default DirectoryTree;
