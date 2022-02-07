import { VideosConstants as Constants } from '../types'
const initialState = {
    videos:[]
};

export function videosReducer(state = initialState, action) {
    switch (action.type) { 
        case Constants.GET:
            return {
                ...state,               
                videos: action.payload.videos,
            };       
        case Constants.ADD:
            return {
                ...state,               
                videos: [...state.videos, action.payload.video]
            };
        case Constants.UPDATE:
            state.videos=state.videos.map((video)=>{
                if(video._id===action.payload.video._id)
                video=action.payload.video
                return video
            })
            return {
                ...state,               
                videos:state.videos
            };         
        case Constants.DELETE:
            return {
                ...state,               
                videos: state.videos.filter((video) => video._id !== action.payload.videoID)
            };    
        case Constants.FAILED:
            return{
                ...state
            }
        default:
            return state
    }
}