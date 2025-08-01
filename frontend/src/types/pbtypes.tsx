import type { FolderObj } from "./main"

    
export type folderIdType =  number | 'drive' | 'shared' | 'starred'

export type pathObj = {
    name: string,
    id: folderIdType
}
export type curDirType = {
    current: pathObj[],
    fading: pathObj[]
}

export type usePathReturnType = {
    addToDir: (string, folderIdType) => void,
    goBackToId: (string, folderIdType) => void,
    goBackOne: () => void,
    goToName: (name: 'recent' | 'starred' | 'shared') => void,
    curDir: curDirType
}

export type usePathProps = {
    folder: FolderObj | null;
    setCurrentFolderId: React.Dispatch<React.SetStateAction<number | string>>
}