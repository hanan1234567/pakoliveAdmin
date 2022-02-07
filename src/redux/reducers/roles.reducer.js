import { RoleConstants as Constants } from '../types'
const initialState = {
    roles: []
};

export function rolesReducer(state = initialState, action) {
    switch (action.type) {  
        case Constants.GET:
            return {
                ...state,               
                roles: action.payload.roles,
            };
       
        case Constants.ADD:
            return {
                ...state,               
                roles: [...state.roles, action.payload.role]
            };

        case Constants.UPDATE:
            let index = state.roles.findIndex((item) => item._id === action.payload.role._id);
            let itemsArray = [...state.roles];
            if(index > -1)
                itemsArray[index] = action.payload.role
            return {
                ...state,               
                roles: itemsArray
            };
        
                
        case Constants.DELETE:
            return {
                ...state,               
                roles: state.roles.filter((item) => item._id !== action.payload.id)
            };
            
        case Constants.FAILED:
            return{
                ...state
            }

        default:
            return state
    }
}