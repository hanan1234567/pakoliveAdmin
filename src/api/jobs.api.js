import { apiUrl, accessToken, apiMaxTime } from '../config.json' 
import {handleResponse, requestTimeout} from './../helpers'

export const jobsApi = {
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
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'jobs', requestOptions))
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
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+app_token
        },
        body: JSON.stringify(data)
    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'jobs', requestOptions))
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
            'Content-Type': 'application/json',    
            'Accept': 'application/json',
            'Authorization': 'Bearer '+app_token
        },
        body: JSON.stringify(data)
    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'jobs', requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}

async function _delete(jobID) {
    let app_token = sessionStorage.getItem(accessToken);
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+app_token
        }
    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'jobs/'+jobID, requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}