import { apiUrl, accessToken, apiMaxTime } from '../config.json' 
import {handleResponse, requestTimeout} from './../helpers'

export const questionBankApi = {
    _get,
    _getByTags,
    _add,
    _update,
    _delete,
};
async function _get(quizID) {    
    console.log("get Request:",quizID)
    let app_token = sessionStorage.getItem(accessToken);
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+app_token
        },

    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'questions/'+quizID, requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}
async function _getByTags(tags,quizID,userID) {    
    let app_token = sessionStorage.getItem(accessToken);
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+app_token
        },
        body:JSON.stringify(tags)

    };
    console.log('userID:',userID)
    return requestTimeout(apiMaxTime,userID?fetch(apiUrl + 'questions_/'+quizID+'/user/'+userID, requestOptions):fetch(apiUrl + 'questions_/'+quizID, requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}


async function _add(qBQuestions,newQuestions,quizQuestions,quizID) {
    let app_token = sessionStorage.getItem(accessToken);
    const requestOptions = {
        method: 'POST',
        headers:{'Content-Type': 'application/json','Accept': 'application/json','Authorization': 'Bearer '+app_token},
        body: JSON.stringify({qBQuestions,newQuestions,quizQuestions})
    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'questions/'+quizID, requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}

async function _update(data,file,contentID) {
    let app_token = sessionStorage.getItem(accessToken);
    const requestOptions = {
        method: 'PUT',
        headers:file?{'Accept': 'application/json','Authorization': 'Bearer '+app_token}:{'Content-Type': 'application/json','Accept': 'application/json','Authorization': 'Bearer '+app_token},
        body: file?data:JSON.stringify(data)
    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'contents/'+contentID, requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}

async function _delete(contentID) {
    let app_token = sessionStorage.getItem(accessToken);
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+app_token
        }
    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'contents/'+contentID, requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}
