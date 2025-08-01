import {useState } from "react";
import type { curDirType, usePathProps, usePathReturnType } from '../../types/pbtypes';


const defaultDir: curDirType = {current: [{name: 'drive', id: 'drive'}], fading: []}
function usePath({folder, setCurrentFolderId}: usePathProps): usePathReturnType {
    const [curDir, setCurDir] = useState<curDirType>(defaultDir)

    function addToDir(name, id) {
            const newObj = {name, id}
            setCurDir(currentDir =>{
                const newDir = [...currentDir.current, newObj]
                return {current: newDir, fading: []}
            })
    }
    function goBackToId(id) {
        setCurDir(currentDir => {
            const lastIndex = currentDir.current.findIndex(obj => obj.id == id)
            const newDir = currentDir.current.slice(0, lastIndex + 1)
            const newFading = currentDir.current.slice(lastIndex+1)
            setCurrentFolderId(id)
            return {
                current: newDir,
                fading: newFading
            }
        })
    }
    function goBackOne() {
        if (curDir.current.length == 1) {return}
        setCurDir(currentDir => {
            const newDir = currentDir.current.slice(0, -1)
            const fadingOne = currentDir.current.slice(-1)
            const [lastElement] = newDir.slice(-1)
            setCurrentFolderId(lastElement.id)
            return {
                current: newDir,
                fading: fadingOne
            }
        })
    }

    function goToRecent() {
      setCurDir(curDir =>{
          const fading = curDir.current.slice(1)
          return {

              current: [{name: 'drive', id: 'drive'}],
              fading
          }
      })
      setCurrentFolderId('drive')
    }
    function goToStarred() {
        if (folder == null) return
        if ('isStarredFolder' in folder) return;
        const inStarredFolder = curDir.current[1]?.id == 'starred'
        if (inStarredFolder) {
            goBackToId('starred')
            return
        }
        setCurrentFolderId('starred')  
        setCurDir(curDir =>{
            const fading = curDir.current.slice(1)
            return {

                current: [{name: 'drive', id: 'drive'}, {name: 'starred', id: 'starred'}],
                fading
            }
        })
    }
    function goToShared() {
        if (folder == null) return

        if ('isSharedFolder' in folder) return;
        const inSharedFolder = curDir.current[1]?.id == 'shared'
        if (inSharedFolder) {
            goBackToId('shared')
            return
        }
        setCurrentFolderId('shared')
        setCurDir(curDir =>{
            const fading = curDir.current.slice(1)

            const newDir: curDirType = {
              current: [{name: 'drive', id: 'drive'}, {name: 'shared', id: 'shared'}],
              fading
            }
            return newDir
        })
    }
    function goToName(name: 'recent' | 'starred' | 'shared'): void {
      if (name == 'recent') {
        goToRecent()
      } else if (name == 'starred') {
        goToStarred()
      } else {
        goToShared()
      }
    }
  return {addToDir, goBackToId, goBackOne, curDir, goToName}
}

export default usePath

