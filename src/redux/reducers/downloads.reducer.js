import { DownloadsConstants as Constants } from '../types'
const initialState = {
    downloads:[]
};

export function downloadsReducer(state = initialState, action) {
    switch (action.type) { 
        case Constants.GET:
            return {
                ...state,               
                downloads: action.payload.downloads,
            };       
        case Constants.ADD:
            return {
                ...state,               
                downloads: [...state.downloads, action.payload.download]
            };
        case Constants.UPDATE:
            state.downloads=state.downloads.map((download)=>{
                if(download._id===action.payload.download._id)
                download=action.payload.download
                return download
            })
            return {
                ...state,               
                downloads:state.downloads
            };         
        case Constants.DELETE:
            return {
                ...state,               
                downloads: state.downloads.filter((download) => download._id !== action.payload.downloadID)
            };    
        case Constants.FAILED:
            return{
                ...state
            }
        default:
            return state
    }
}