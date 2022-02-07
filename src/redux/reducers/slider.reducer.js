import { SliderConstants as Constants } from '../types'
const initialState = {
    slider:[]
};

export function sliderReducer(state = initialState, action) {
    switch (action.type) { 
        case Constants.GET:
            return {
                ...state,               
                slider: action.payload.slider,
            };       
        case Constants.ADD:
            return {
                ...state,               
                slider: [...state.slider, action.payload.slide]
            };
        case Constants.UPDATE:
            state.slider=state.slider.map((slide)=>{
                if(slide._id===action.payload.slide._id)
                slide=action.payload.slide
                return slide
            })
            return {
                ...state,               
                slider:state.slider
            };         
        case Constants.DELETE:
            return {
                ...state,               
                slider: state.slider.filter((slide) => slide._id !== action.payload.slideID)
            };    
        case Constants.FAILED:
            return{
                ...state
            }
        default:
            return state
    }
}