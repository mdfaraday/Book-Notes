import { SAVE_RESOURCE, SAVE_SECTION, REMOVE_SECTION } from '../actions/saveResourceInfo.action'

const initialState = {
    resourceList: [{name: 'Four Hour body', sections: [{title: 'sex', description: 'sex is good'}]}, {name: 'Boundless', sections: [{title: 'medicine', description: 'good medicine'}]}]
}
//{name: 'Four Hour body', sections: [{title: 'sex', description: 'sex is good'}]}, {name: 'Boundless', sections: [{title: 'medicine', description: 'good medicine'}]}

export default (state = initialState, action) => {
    switch (action.type) {
        case SAVE_RESOURCE:
            const newResource = { name: action.info.name, sections: [] }
            return { ...state, resourceList: state.resourceList.concat(newResource) }
        case SAVE_SECTION:
            const newList = state.resourceList
            for (let i = 0; i < newList.length; i++) {
                if (newList[i].name.toString() === action.info.name.toString()) {
                    newList[i].sections.push({ title: action.info.title, description: action.info.description })
                }
            }
            return { ...state, resourceList: newList}
        case REMOVE_SECTION:
            const newListTwo = state.resourceList
            let updatedSectionList
            for (i=0; i < newListTwo.length; i++) {
                updatedSectionList = newListTwo[i].sections.filter(item => item.title !== action.info.title)
                // for (j=0;j<newList[i].sections.length;j++) {
                //     if (newList[i][j].title === action.info.title) 
                    
                // }
                newListTwo[i].sections = updatedSectionList
            }
            console.log(newListTwo)
            return { ...state, resourceList: newListTwo}
    }
    return state
}