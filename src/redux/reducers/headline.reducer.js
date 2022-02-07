import { HeadlineConstants as Constants } from '../types'
const initialState = {
    headlines:[]
};

export function headlineReducer(state = initialState, action) {
    switch (action.type) { 
        case Constants.GET:
            return {
                ...state,               
                headlines: action.payload.headlines,
            };       
        case Constants.ADD:
            return {
                ...state,               
                headlines: [...state.headlines, action.payload.headline]
            };
        case Constants.UPDATE:
            state.headlines=state.headlines.map((headline)=>{
                if(headline._id===action.payload.headline._id)
                headline=action.payload.headline
                return headline
            })
            return {
                ...state,               
                headlines:state.headlines
            };         
        case Constants.DELETE:
            return {
                ...state,               
                headlines: state.headlines.filter((headline) => headline._id !== action.payload.headlineID)
            };    
        case Constants.FAILED:
            return{
                ...state
            }
        default:
            return state
    }
}