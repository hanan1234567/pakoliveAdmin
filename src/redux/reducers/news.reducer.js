import { NewsConstants as Constants } from '../types'
const initialState = {
    newses:[]
};

export function newsReducer(state = initialState, action) {
    switch (action.type) { 
        case Constants.GET:
            return {
                ...state,               
                newses: action.payload.newses,
            };       
        case Constants.ADD:
            return {
                ...state,               
                newses: [...state.newses, action.payload.news]
            };
        case Constants.UPDATE:
            state.newses=state.newses.map((news)=>{
                if(news._id===action.payload.news._id)
                news=action.payload.news
                return news
            })
            return {
                ...state,               
                newses:state.newses
            };         
        case Constants.DELETE:
            return {
                ...state,               
                newses: state.newses.filter((news) => news._id !== action.payload.newsID)
            };    
        case Constants.FAILED:
            return{
                ...state
            }
        default:
            return state
    }
}