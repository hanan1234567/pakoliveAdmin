import { SubjectConstants as Constants } from '../types'
const initialState = {
    subjects: [],
    classes: [],
    subject: null
};

export function subjectsReducer(state = initialState, action) {
    console.log(action)
    switch (action.type) { 
        case Constants.GET:
            return {
                ...state,               
                subjects: action.payload.subjects,
            };

        case Constants.SUBJECT_DETAILS:
            return {
                ...state,               
                subject: action.payload.subject,
            };

        case Constants.GET_CLASSES:
            return {
                ...state,               
                classes: action.payload.classes,
            };
       
        case Constants.ADD:
            return {
                ...state,               
                subjects: [...state.subjects, action.payload.subject]
            };

        case Constants.ADD_CLASS:
            return {
                ...state,               
                classes: [...state.classes, action.payload.class]
            };

        case Constants.UPDATE:
            let index = state.subjects.findIndex((item) => item._id === action.payload.subject._id);
            let itemsArray = [...state.subjects];
            if(index > -1)
                itemsArray[index] = action.payload.subject
            return {
                ...state,               
                subjects: itemsArray
            };

        case Constants.UPDATE_CLASS:
            let class_index = state.classes.findIndex((item) => item._id === action.payload.class._id);
            let classArray = [...state.classes];
            if(class_index > -1)
                classArray[class_index] = action.payload.class
            return {
                ...state,               
                classes: classArray
            };
        
                
        case Constants.DELETE:
            return {
                ...state,               
                subjects: state.subjects.filter((item) => item._id !== action.payload.id)
            };

        case Constants.DELETE_CLASS:
            return {
                ...state,               
                classes: state.classes.filter((item) => item._id !== action.payload.id)
            };
            
        case Constants.FAILED:
            return{
                ...state
            }

        case Constants.CLEAR_SUBJECTS:
            return{
                ...state,
                subjects: null
            }

        case Constants.CLEAR_SUBJECT:
            return{
                ...state,
                subject: null
            }
        case Constants.ADD_CHAPTER:
            let temp=state.subject;
            temp.chapters.push(action.payload.chapter)
            console.log("temp:",temp)
            return {
                ...state,               
                subject: temp
            };
        case Constants.UPDATE_CHAPTER:
            let tempArr=state.subject;
            tempArr.chapters=tempArr.chapters.map((chapter)=>{
                if(chapter._id===action.payload.Chapter._id)
                chapter=action.payload.Chapter
                return chapter
            })
            return {
                ...state,               
                subject: tempArr
            };
        case Constants.DELETE_CHAPTER:
            let filterArr=state.subject;
            filterArr.chapters=filterArr.chapters.filter((chapter)=> chapter._id!==action.payload.id)
            return {
                ...state,               
                subject: {...filterArr}
            };
        case Constants.ADD_TOPIC:
            let temp_arr=state.subject;
            temp_arr.chapters=temp_arr.chapters.map((chapter)=>{ 
                console.log(chapter._id===action.payload.chapterID)
                if(chapter._id===action.payload.chapterID)
                return action.payload.Chapter
                return chapter
                })
            return {
                ...state,               
                subject: temp_arr
            };
        case Constants.UPDATE_TOPIC:
            let update_arr=state.subject;
            update_arr.chapters=update_arr.chapters.map((chapter)=>{ 
                console.log(chapter._id===action.payload.chapterID)
                if(chapter._id===action.payload.chapterID)
                return action.payload.Chapter
                return chapter
                })
            return {
                ...state,               
                subject: update_arr
            };
        case Constants.DELETE_TOPIC:
            let arr=state.subject;
            arr.chapters=arr.chapters.map((chapter)=>{ 
                if(chapter._id===action.payload.chapterID)
                    chapter.topics=chapter.topics.filter((topic,t)=> topic._id!==action.payload.topicID)
                return chapter       
                })
            return {
                ...state,               
                subject: arr
            };
        case Constants.ADD_CONTENT:
            let content_arr=state.subject;
            content_arr.chapters=content_arr.chapters.map((chapter)=>{ 
                if(chapter._id===action.payload.chapterID)
                {
                    chapter.topics=chapter?.topics?.map((topic,t)=>{
                        if(topic._id===action.payload.topicID)
                        topic?.contents?.push(action.payload.content)
                        return topic
                    })
                }
                return chapter
                })
            return {
                ...state,               
                subject: content_arr
            };
        case Constants.DELETE_CONTENT:
            let delete_arr=state.subject;
            delete_arr.chapters=delete_arr.chapters.map((chapter)=>{ 
                if(chapter._id===action.payload.chapterID)
                {
                    chapter.topics=chapter?.topics?.map((topic,t)=>{
                        if(topic._id===action.payload.topicID)
                        {
                            topic.contents=topic?.contents?.filter((content)=> content._id!==action.payload.contentID)
                        }
                        return topic
                    })
                }
                return chapter
                })
            return {
                ...state,               
                subject: delete_arr
            };
        case Constants.UPDATE_CONTENT:
            let update_array=state.subject;
            update_array.chapters=update_array.chapters.map((chapter)=>{ 
                if(chapter._id===action.payload.chapterID)
                {
                    chapter.topics=chapter?.topics?.map((topic,t)=>{
                        if(topic._id===action.payload.topicID)
                        {
                            topic.contents=topic.contents.map((content)=>{
                                if(content._id===action.payload.content._id)
                                  content=action.payload.content
                                return content
                            })
                        }
                        return topic
                    })
                }
                return chapter
                })
            return {
                ...state,               
                subject: update_array
            };
        default:
            return state
    }
}