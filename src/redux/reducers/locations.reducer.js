import { LocationsConstants as Constants } from '../types'
const initialState = {
    locations:[]
};

export function locationsReducer(state = initialState, action) {
    switch (action.type) { 
        case Constants.GET:
            return {
                ...state,               
                locations: action.payload.locations,
            };       
        case Constants.ADD:
            return {
                ...state,               
                locations: [...state.locations, action.payload.location]
            };
        case Constants.UPDATE:
            state.locations=state.locations.map((location)=>{
                if(location._id===action.payload.location._id)
                location=action.payload.location
                return location
            })
            return {
                ...state,               
                locations:state.locations
            };         
        case Constants.DELETE:
            return {
                ...state,               
                locations: state.locations.filter((location) => location._id !== action.payload.locationID)
            };    
        case Constants.FAILED:
            return{
                ...state
            }
        default:
            return state
    }
}