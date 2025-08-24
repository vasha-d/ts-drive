import type { FileObjType, FolderObj } from "../../types/main"

export default function useSortChildren(driveMode, folders, files) {
    if (!folders || !files) return null
    if (!driveMode) {
        driveMode = ''
    }
    if (driveMode == '') {
        return sortByDates(folders, files, 'dateCreated')
    } else
    if (driveMode == 'recent') {
        return sortByDates(folders, files, 'dateModified')
    }
    if (driveMode == 'starred') {
        return sortByDates(folders, files, 'dateModified')
    }
    if (driveMode == 'shared') {
        return sortByDates(folders, files, 'dateModified')   
    }

}

function sortByDates(folders, files, type): [FolderObj[], FileObjType[]] {
    let sortFunction = {}
    sortFunction.dateCreated = 
        (f1, f2) => {
            let d1 = new Date(f1.createdAt)
            let d2 = new Date(f2.createdAt)
            return d2 - d1
        }
    sortFunction.dateModified = 
        (f1, f2) => {
            let d1 = new Date(f1.lastModified)
            let d2 = new Date(f2.lastModified)
            return d2 - d1
        }
    let funcToUse = sortFunction[type]
    let childrenFolders = folders.sort(
        funcToUse
    )
    let childrenFiles = files.sort(
        funcToUse
    )
    return [childrenFolders, childrenFiles]

}