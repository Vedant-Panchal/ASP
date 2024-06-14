class FolderNode {
  constructor(id, UserId, createdAt, name, parentId, path) {
    this.id = id;
    this.UserId = UserId;
    this.createdAt = createdAt;
    this.name = name;
    this.parentId = parentId;
    this.path = path;
    this.children = [];
  }
}

class FileNode {
  constructor(id, createdAt, folderId, name, url) {
    this.id = id;
    this.createdAt = createdAt;
    this.folderId = folderId;
    this.name = name;
    this.url = url;
  }
}

class DirectoryTree {
  constructor() {
    this.rootFolder = [];
    this.children = [];
    this.filesArr = [];
    this.folderArr = [];
  }

  createFiles(files) {
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

  createFolders(folders) {
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

  addFilesToFolder() {
    this.filesArr.forEach((file) => {
      this.folderArr.forEach((folder) => {
        if (folder.id === file.folderId) {
          folder.children.push(file);
        }
      });
    });
  }

  createTree() {
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
  }

  getTree() {
    return this.rootFolder;
  }
}

export default DirectoryTree;
