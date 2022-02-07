import { LinksConstants as Constants } from '../types'
const initialState = {
    links:[]
};

export function linksReducer(state = initialState, action) {
    switch (action.type) { 
        case Constants.GET:
            return {
                ...state,               
                links: action.payload.links,
            };       
        case Constants.ADD:
            return {
                ...state,               
                links: [...state.links, action.payload.link]
            };
        case Constants.UPDATE:
            state.links=state.links.map((link)=>{
                if(link._id===action.payload.link._id)
                link=action.payload.link
                return link
            })
            return {
                ...state,               
                links:state.links
            };         
        case Constants.DELETE:
            return {
                ...state,               
                links: state.links.filter((link) => link._id !== action.payload.linkID)
            };    
        case Constants.FAILED:
            return{
                ...state
            }
        default:
            return state
    }
}