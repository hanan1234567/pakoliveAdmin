import { QuestionBankConstants as Constants } from '../types'
const initialState = {
    questionBankTagQuestions: [],
    quizQuestions:[]
};

export function questionBankReducer(state = initialState, action) {
    switch (action.type) {  
        case Constants.GET:
            return {
                ...state,               
                quizQuestions: action.payload.questions,
            };
        case Constants.GETBYTAGS:
            return {
                ...state,               
                questionBankTagQuestions: action.payload.questions,
            };
        case Constants.CLEAR:
            return {
                ...state,
                questionBankTagQuestions: []
            }
       
        case Constants.ADD:
            return {
                ...state,               
                quizQuestions: [...state.quizQuestions,action.payload.questions]
            };

        case Constants.UPDATE:
            let index = state.questionBank.findIndex((item) => item._id === action.payload.Content._id);
            let itemsArray = [...state.questionBank];
            if(index > -1)
                itemsArray[index] = action.payload.Content
            return {
                ...state,               
                questionBank: itemsArray
            };
        
                
        case Constants.DELETE:
            return {
                ...state,               
                questionBank: state.questionBank.filter((item) => item._id !== action.payload.Content)
            };
            
        case Constants.FAILED:
            return{
                ...state
            }

        default:
            return state
    }
}