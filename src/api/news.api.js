import { apiUrl, accessToken, apiMaxTime } from '../config.json' 
import {handleResponse, requestTimeout} from './../helpers'

export const newsApi = {
    _get,
    _add,
    _update,
    _delete,
};
async function _get() {    
    let app_token = sessionStorage.getItem(accessToken);
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+app_token
        }
    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'news', requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}


async function _add(data) {
    let app_token = sessionStorage.getItem(accessToken);
    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+app_token
        },
        body: data
    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'news', requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}
async function _update(data) {
    let app_token = sessionStorage.getItem(accessToken);
    const requestOptions = {
        method: 'PUT',
        headers: {            
            'Accept': 'application/json',
            'Authorization': 'Bearer '+app_token
        },
        body: data
    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'news', requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}

async function _delete(newsID) {
    let app_token = sessionStorage.getItem(accessToken);
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+app_token
        }
    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'news/'+newsID, requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}