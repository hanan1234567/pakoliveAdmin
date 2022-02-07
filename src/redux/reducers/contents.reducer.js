import { ContentsConstants as Constants } from '../types'
const initialState = {
    contents: []
};

export function contentsReducer(state = initialState, action) {
    switch (action.type) {  
        case Constants.GET:
            return {
                ...state,               
                contents: action.payload.Contents,
            };
       
        case Constants.ADD:
            return {
                ...state,               
                contents: [...state.contents,action.payload.content]
            };

        case Constants.UPDATE:
            let index = state.contents.findIndex((item) => item._id === action.payload.Content._id);
            let itemsArray = [...state.contents];
            if(index > -1)
                itemsArray[index] = action.payload.Content
            return {
                ...state,               
                contents: itemsArray
            };
        
                
        case Constants.DELETE:
            return {
                ...state,               
                contents: state.contents.filter((item) => item._id !== action.payload.Content)
            };
            
        case Constants.FAILED:
            return{
                ...state
            }

        default:
            return state
    }
}