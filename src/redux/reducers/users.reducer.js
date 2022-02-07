import { UserConstants as Constants } from '../types'
const initialState = {
    users: []
};

export function usersReducer(state = initialState, action) {
    switch (action.type) {  
        case Constants.GET:
            return {
                ...state,               
                users: action.payload.users,
            };
       
        case Constants.ADD:
            return {
                ...state,               
                users: [...state.users, action.payload.user]
            };

        case Constants.UPDATE:
            let index = state.users.findIndex((item) => item._id === action.payload.user._id);
            let itemsArray = [...state.users];
            if(index > -1)
                itemsArray[index] = action.payload.user
            return {
                ...state,               
                users: itemsArray
            };
        
                
        case Constants.DELETE:
            return {
                ...state,               
                users: state.users.filter((item) => item._id !== action.payload.id)
            };
            
        case Constants.FAILED:
            return{
                ...state
            }

        default:
            return state
    }
}