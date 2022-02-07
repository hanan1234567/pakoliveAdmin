import { GalleryConstants as Constants } from '../types'
const initialState = {
    gallerys:[]
};

export function galleryReducer(state = initialState, action) {
    switch (action.type) { 
        case Constants.GET:
            return {
                ...state,               
                gallerys: action.payload.gallerys,
            };       
        case Constants.ADD:
            return {
                ...state,               
                gallerys: [...state.gallerys, action.payload.gallery]
            };
        case Constants.ADDGALLERYIMAGE:
            state.gallerys=state.gallerys.map((gallery)=>{
                if(gallery._id===action.payload.gallery._id)
                gallery=action.payload.gallery
                return gallery
            })
            return {
                ...state,               
                gallerys: [...state.gallerys]
            };
        case Constants.UPDATE:
            state.gallerys=state.gallerys.map((gallery)=>{
                if(gallery._id===action.payload.gallery._id)
                gallery=action.payload.gallery
                return gallery
            })
            return {
                ...state,               
                gallerys:state.gallerys
            };            
        case Constants.DELETE:
            return {
                ...state,               
                gallerys: state.gallerys.filter((gallery) => gallery._id !== action.payload.galleryID)
            };    
        case Constants.FAILED:
            return{
                ...state
            }
        default:
            return state
    }
}