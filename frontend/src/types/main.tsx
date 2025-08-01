export type GetFolderResult = {
    loading: boolean, 
    folder: FolderObj | StarredFolderObj | SharedFolderObj | null, 
    error: errObj, 
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>, 
    setCurrentFolderId: React.Dispatch<React.SetStateAction<number | string>>
}

export type FolderObj = {
    id: number | string
    name: string,
    drive: boolean,
    createdAt: string,
    starred: boolean,
    lastModified: string,
    lastAccessed: string,
    ownerId: number,
    parentId: number | string,
    starredParentId: number,
    parentFolder: FolderObj,
    childrenFolders: FolderObj[],
    files: FileObj,
} | StarredFolderObj | SharedFolderObj
export type StarredFolderObj = {
    childrenFolders: FolderObj[],
    files: FileObj[],
    isStarredFolder: true

}
export type SharedFolderObj = {
    childrenFolders: FolderObj[],
    files: FileObj[],
    isSharedFolder: true
    
}

export type FileObj = {
    id: number,
    name: string,
    size: number,
    extension: string,
    starred: boolean,
    createdAt: string,
    lastModified: string,
    lastAccessed: string,
    ownerId: number,
    parentId: number,
    starredParentId?: number,
    publicId: string,
    resourceType: string, // maybe add enum
    parentFolder: FolderObj
}

export type errObj = {
    message: string,
    status: number | undefined
}