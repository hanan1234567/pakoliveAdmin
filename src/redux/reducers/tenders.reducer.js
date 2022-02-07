import { TendersConstants as Constants } from '../types'
const initialState = {
    tenders:[]
};

export function tendersReducer(state = initialState, action) {
    switch (action.type) { 
        case Constants.GET:
            return {
                ...state,               
                tenders: action.payload.tenders,
            };       
        case Constants.ADD:
            return {
                ...state,               
                tenders: [...state.tenders, action.payload.tender]
            };
        case Constants.UPDATE:
            state.tenders=state.tenders.map((tender)=>{
                if(tender._id===action.payload.tender._id)
                tender=action.payload.tender
                return tender
            })
            return {
                ...state,               
                tenders:state.tenders
            };         
        case Constants.DELETE:
            return {
                ...state,               
                tenders: state.tenders.filter((tender) => tender._id !== action.payload.tenderID)
            };    
        case Constants.FAILED:
            return{
                ...state
            }
        default:
            return state
    }
}