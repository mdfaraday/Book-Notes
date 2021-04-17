import AsyncStorage from '@react-native-community/async-storage'

export const SAVE_RESOURCE = 'SAVE_RESOURCE'
export const SAVE_SECTION = 'SAVE_SECTION'
export const REMOVE_SECTION = 'REMOVE_SECTION'

export const saveResource = (name) => {
    return { type: SAVE_RESOURCE, info: { name }}
}

export const saveSection = (name, title, description) => {
    return { type: SAVE_SECTION, 
        info: {
            name,
            title,
            description
        }
    }
}

export const removeSection = (title) => {
    return { type: REMOVE_SECTION, info: { title } }
}

// return async (dispatch) => { 
//     try {
//         const info = { name: action.info.name, sections: [] }
//         await AsyncStorage.setItem(name, JSON.stringify(info))
//         dispatch({ type: SAVE_RESOURCE, newName: name })
//     } catch (e) {
//         throw e
//     }
    
// }