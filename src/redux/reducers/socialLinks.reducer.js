import { SocialLinksConstants as Constants } from '../types'
const initialState = {
    socialLinks:[]
};

export function socialLinksReducer(state = initialState, action) {
    switch (action.type) { 
        case Constants.GET:
            return {
                ...state,               
                socialLinks: action.payload.links,
            };       
        case Constants.ADD:
            return {
                ...state,               
                socialLinks: [...state.socialLinks, action.payload.link]
            };
        case Constants.UPDATE:
            state.socialLinks=state.socialLinks.map((link)=>{
                if(link._id===action.payload.link._id)
                link=action.payload.link
                return link
            })
            return {
                ...state,               
                socialLinks:state.socialLinks
            };         
        case Constants.DELETE:
            return {
                ...state,               
                socialLinks: state.socialLinks.filter((link) => link._id !== action.payload.linkID)
            };    
        case Constants.FAILED:
            return{
                ...state
            }
        default:
            return state
    }
}