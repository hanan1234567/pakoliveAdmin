import { ClassesConstants as Constants } from '../types'
const initialState = {
    classes: []
};

export function classesReducer(state = initialState, action) {
    switch (action.type) {  
        case Constants.GET:
            return {
                ...state,               
                classes: action.payload.classes,
            };
       
        case Constants.ADD:
            return {
                ...state,               
                classes: [...state.classes, action.payload.class]
            };

        case Constants.UPDATE:
            let index = state.classes.findIndex((item) => item._id === action.payload.class._id);
            let itemsArray = [...state.classes];
            if(index > -1)
                itemsArray[index] = action.payload.class
            return {
                ...state,               
                classes: itemsArray
            };
        
                
        case Constants.DELETE:
            return {
                ...state,               
                classes: state.classes.filter((item) => item._id !== action.payload.id)
            };
            
        case Constants.FAILED:
            return{
                ...state
            }

        default:
            return state
    }
}