import { apiUrl, accessToken, apiMaxTime } from '../config.json' 
import {handleResponse, requestTimeout} from './../helpers'

export const subjectsApi = {
    _get,
    _add,
    _update,
    _delete,
    _get_classes,
    _add_class,
    _update_class,
    _delete_class,
    _details,
    _addChapter,
    _updateChapter,
    _deleteChapter,
    _addTopic,
    _updateTopic,
    _deleteTopic,
    _addContent,
    _deleteContent,
    _updateContent,
};
async function _get(id) {    
    let app_token = sessionStorage.getItem(accessToken);
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+app_token
        }
    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'subjects/'+id, requestOptions))
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
            // 'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+app_token
        },
        body: data
    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'subjects', requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}

async function _update(data, id) {
    let app_token = sessionStorage.getItem(accessToken);
    const requestOptions = {
        method: 'POST',
        headers: {            
            'Accept': 'application/json',
            'Authorization': 'Bearer '+app_token
        },
        body: data
    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'subjects/'+id, requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}

async function _delete(id) {
    let app_token = sessionStorage.getItem(accessToken);
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+app_token
        }
    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'subjects/'+id, requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}


async function _get_classes() {    
    let app_token = sessionStorage.getItem(accessToken);
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+app_token
        }
    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'classes', requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}


async function _add_class(data) {
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
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'classes', requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}

async function _update_class(data, id) {
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
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'classes/'+id, requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}

async function _delete_class(id) {
    let app_token = sessionStorage.getItem(accessToken);
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+app_token
        }
    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'classes/'+id, requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}

async function _details(id) {    
    let app_token = sessionStorage.getItem(accessToken);
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+app_token
        }
    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'subjects/details/'+id, requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}
//chapter
async function _addChapter(data) {
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
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'chapters', requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}
async function _updateChapter(data,chapterID) {
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
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'chapters/'+chapterID, requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}
async function _deleteChapter(chapterID) {
    let app_token = sessionStorage.getItem(accessToken);
    const requestOptions = {
        method: 'DELETE',
        headers: {
             'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+app_token
        }
    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'chapters/'+chapterID, requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}

//topics apis
async function _addTopic(data,chapterID) {
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
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'topics/'+chapterID, requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}
async function _updateTopic(data,chapterID) {
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
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'topics/'+chapterID, requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}
async function _deleteTopic(topicID,chapterID) {
    let app_token = sessionStorage.getItem(accessToken);
    const requestOptions = {
        method: 'DELETE',
        headers: {
             'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer '+app_token
        },
        body: JSON.stringify({topic_id:topicID})
    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'topics/'+chapterID, requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}
//conent
async function _addContent(data,file,topicID,chapterID) {
    console.log("file:",file)
    console.log("data:",data)
    console.log("topicID:",topicID)
    console.log("chapterID:",chapterID)
    let app_token = sessionStorage.getItem(accessToken);
    const requestOptions = {
        method: 'POST',
        headers:file?{'Accept': 'application/json','Authorization': 'Bearer '+app_token}:{'Content-Type': 'application/json','Accept': 'application/json','Authorization': 'Bearer '+app_token},
        body: file?data:JSON.stringify(data)
    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'contents/'+chapterID+'/topic/'+topicID, requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}
async function _deleteContent(chapterID,topicID,contentID) {
    let app_token = sessionStorage.getItem(accessToken);
    const requestOptions = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
           'Accept': 'application/json',
           'Authorization': 'Bearer '+app_token
       },
       body:JSON.stringify({chapterID,topicID})
    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'contents/'+contentID, requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}
async function _updateContent(data,file,topicID,chapterID) {
    console.log("file:",file)
    console.log("data:",data)
    console.log("topicID:",topicID)
    console.log("chapterID:",chapterID)
    let app_token = sessionStorage.getItem(accessToken);
    const requestOptions = {
        method: 'PUT',
        headers:file?{'Accept': 'application/json','Authorization': 'Bearer '+app_token}:{'Content-Type': 'application/json','Accept': 'application/json','Authorization': 'Bearer '+app_token},
        body: file?data:JSON.stringify(data)
    };
    return requestTimeout(apiMaxTime,fetch(apiUrl + 'contents/'+chapterID+'/topic/'+topicID, requestOptions))
                .then(handleResponse)
                .then((data) => {                
                    return data;
                });
}