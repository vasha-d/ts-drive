import React from 'react';
import Folder from './Folder';
import File from './File';

function childrenList (childrenFolders, files) {
    childrenFolders = childrenFolders.map(folder => {
        let newFolder = Object.assign({type: 'folder'}, folder)
        return newFolder
    })
    files = files.map(file => {
        let newFile = Object.assign({type: 'file'}, file)
        return newFile
    })  

    let toReturn = [...childrenFolders, ...files]
    return toReturn
}

const Children = ({childrenFolders, files, onClickFile}) => {


    let childrenElements = childrenList(childrenFolders, files)
        .map(child => {
            if (child.type == 'folder') {
                return <Folder 
                key={`folder-${child.id}`} 
                folderObj={child}
                ></Folder>
            }
            if (child.type == 'file') {
                return <File 
                key={`file-${child.id}`} 
                fileObj={child}
                onClickFile={onClickFile}
                ></File>
            }
        })

    return (
        <div>
            {childrenElements}
        </div>
    );
}

export default Children;
