import { JobsConstants as Constants } from '../types'
const initialState = {
    jobs:[]
};

export function jobsReducer(state = initialState, action) {
    switch (action.type) { 
        case Constants.GET:
            return {
                ...state,               
                jobs: action.payload.jobs,
            };       
        case Constants.ADD:
            return {
                ...state,               
                jobs: [...state.jobs, action.payload.job]
            };
        case Constants.UPDATE:
            state.jobs=state.jobs.map((job)=>{
                if(job._id===action.payload.job._id)
                job=action.payload.job
                return job
            })
            return {
                ...state,               
                jobs:state.jobs
            };         
        case Constants.DELETE:
            return {
                ...state,               
                jobs: state.jobs.filter((job) => job._id !== action.payload.jobID)
            };    
        case Constants.FAILED:
            return{
                ...state
            }
        default:
            return state
    }
}