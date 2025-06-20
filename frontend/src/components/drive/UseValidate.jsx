import React, { useState } from 'react'


//Type = 'newFolder', 'shareName', 'renameFolder', 'renameFile'
//For rename: check if name already exists in current directory
//For new folder: check if name already exists in current directory
//For move folder: check if folder with same name already exists in directory
//For shareWithName: check if user exists
function useValidate({text, type, targetFolder=null}) {

    let [valid, setValid] = useState('undetermined')

    if (type =='rename') {
        
        let isValid = targetFolder.childrenFolders.some(
            f => f.name == text
        )

        setValid(isValid)
    }

    if (type =='share') {
        //check if user exists
    }


    return valid
}

export default useValidate