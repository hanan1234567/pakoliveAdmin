import { apiUrl, accessToken, apiMaxTime } from '../config.json' 
import {handleResponse, requestTimeout} from './../helpers'

export const contentsApi = {
    _get,
    _add,
    _update,
    _delete,
};
async function _get(topicID) {    
    let app_token = sessionStorage.getItem(accessToken);
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+app_token
        }
    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'contents/'+topicID, requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}


async function _add(data,file,topicID) {
    let app_token = sessionStorage.getItem(accessToken);
    const requestOptions = {
        method: 'POST',
        headers:file?{'Accept': 'application/json','Authorization': 'Bearer '+app_token}:{'Content-Type': 'application/json','Accept': 'application/json','Authorization': 'Bearer '+app_token},
        body: file?data:JSON.stringify(data)
    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'contents/'+topicID, requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}

async function _update(data,file,contentID) {
    console.log("file:",file)
    console.log("data:",data)
    console.log("contentID:",contentID)
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
