import { TeamConstants as Constants } from '../types'
const initialState = {
    team:[]
};

export function teamReducer(state = initialState, action) {
    switch (action.type) { 
        case Constants.GET:
            return {
                ...state,               
                team: action.payload.team,
            };       
        case Constants.ADD:
            return {
                ...state,               
                team: [...state.team, action.payload.team]
            };
        case Constants.UPDATE:
            state.team=state.team.map((team)=>{
                if(team._id===action.payload.team._id)
                team=action.payload.team
                return team
            })
            return {
                ...state,               
                team:state.team
            };         
        case Constants.DELETE:
            return {
                ...state,               
                team: state.team.filter((team) => team._id !== action.payload._id)
            };    
        case Constants.FAILED:
            return{
                ...state
            }
        default:
            return state
    }
}