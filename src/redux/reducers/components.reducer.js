import { ComponentsConstants as Constants } from '../types'
const initialState = {
    components:[]
};

export function componentsReducer(state = initialState, action) {
    switch (action.type) { 
        case Constants.GET:
            return {
                ...state,               
                components: action.payload.components,
            };       
        case Constants.ADD:
            return {
                ...state,               
                components: [...state.components, action.payload.component]
            };
        case Constants.UPDATE:
            state.components=state.components.map((component)=>{
                if(component._id===action.payload.component._id)
                component=action.payload.component
                return component
            })
            return {
                ...state,               
                components:state.components
            };         
        case Constants.DELETE:
            return {
                ...state,               
                components: state.components.filter((component) => component._id !== action.payload._id)
            };    
        case Constants.FAILED:
            return{
                ...state
            }
        default:
            return state
    }
}