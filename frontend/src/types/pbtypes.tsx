import type { FolderObj } from "./main"

    
export type folderIdType =  number | 'drive' | 'shared' | 'starred'

export type pathObj = {
    name: string,
    id: folderIdType,
} | {
    name: string,
    id: folderIdType,
    uncertain: boolean
} 
export type curDirType = {
    current: pathObj[],
    fading: pathObj[],

}

export type usePathReturnType = {
    addToDir: (string, folderIdType) => void,
    goBackToId: (string, folderIdType) => void,
    goBackOne: () => void,
    goToName: (name: 'recent' | 'starred' | 'shared') => void,
    status: pathStatusType
}
export type pathStatusType = {
    
    curDir: curDirType,
    lastAction: lastDirActionType

}

export type usePathProps = {
    folder: FolderObj | null;
    setCurrentFolderId: React.Dispatch<React.SetStateAction<number | string>>
}
export type PathBarProps = {
    goBackToId: (string, folderIdType) => void,
    status: {
        curDir: curDirType,
        lastAction: lastDirActionType
    }
}
export type lastDirActionType = 
    'addToDir' | 
    'goBackToId' |
    'goBackOne' | 
    'goToStarred' |
    'goToShared' |
    'goToRecent' |
    null