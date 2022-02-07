import { SubjectConstants as Constants } from '../types'
import { subjectsApi as api } from '../../api'

export const subjectsAction = {
    get,
    add,
    update,
    remove,
    get_classes,
    add_class,
    update_class,
    remove_class,
    clear_subjects,
    clear_subject,
    details,
    addChapter,
    updateChapter,
    deleteChapter,
    addTopic,
    updateTopic,
    deleteTopic,
    addContent,
    deleteContent,
    updateContent,
};


function get(id) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api._get(id)
                .then(
                    payload => {
                        dispatch(success(payload));
                        resolve(payload)
                    },
                    error => {
                        dispatch(failure('Failed'));
                        reject(error)
                    }
                )

        });
    }
    function success(payload) { return { type: Constants.GET, payload } }
    function failure(error) { return { type: Constants.FAILED, error } }
}

function add(data) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api._add(data)
                .then(
                    payload => {
                        dispatch(success(payload));
                        resolve(payload)
                    },
                    error => {
                        dispatch(failure('Failed'));
                        reject(error)
                    }
                )

        });
    }
    function success(payload) { return { type: Constants.ADD, payload } }
    function failure(error) { return { type: Constants.FAILED, error } }
}

function update(data, id) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api._update(data, id)
                .then(
                    payload => {
                        dispatch(success(payload));
                        resolve(payload)
                    },
                    error => {
                        dispatch(failure('Failed'));
                        reject(error)
                    }
                )

        });
    }
    function success(payload) { return { type: Constants.UPDATE, payload } }
    function failure(error) { return { type: Constants.FAILED, error } }
}

function remove(id) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api._delete(id)
                .then(
                    payload => {
                        dispatch(success(payload));
                        resolve(payload)
                    },
                    error => {
                        dispatch(failure('Failed'));
                        reject(error)
                    }
                )

        });
    }
    function success(payload) { return { type: Constants.DELETE, payload } }
    function failure(error) { return { type: Constants.FAILED, error } }
}

function get_classes() {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api._get_classes()
                .then(
                    payload => {
                        dispatch(success(payload));
                        resolve(payload)
                    },
                    error => {
                        dispatch(failure('Failed'));
                        reject(error)
                    }
                )

        });
    }
    function success(payload) { return { type: Constants.GET_CLASSES, payload } }
    function failure(error) { return { type: Constants.FAILED, error } }
}


function add_class(data) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api._add_class(data)
                .then(
                    payload => {
                        dispatch(success(payload));
                        resolve(payload)
                    },
                    error => {
                        dispatch(failure('Failed'));
                        reject(error)
                    }
                )

        });
    }
    function success(payload) { return { type: Constants.ADD_CLASS, payload } }
    function failure(error) { return { type: Constants.FAILED, error } }
}

function update_class(data, id) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api._update_class(data, id)
                .then(
                    payload => {
                        dispatch(success(payload));
                        resolve(payload)
                    },
                    error => {
                        dispatch(failure('Failed'));
                        reject(error)
                    }
                )

        });
    }
    function success(payload) { return { type: Constants.UPDATE_CLASS, payload } }
    function failure(error) { return { type: Constants.FAILED, error } }
}

function remove_class(id) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api._delete_class(id)
                .then(
                    payload => {
                        dispatch(success(payload));
                        resolve(payload)
                    },
                    error => {
                        dispatch(failure('Failed'));
                        reject(error)
                    }
                )

        });
    }
    function success(payload) { return { type: Constants.DELETE_CLASS, payload } }
    function failure(error) { return { type: Constants.FAILED, error } }
}

function clear_subjects() {
    return dispatch => {
        return new Promise((resolve, reject) => {
                dispatch(success());
                resolve()                    
        });
    }
    function success() { return { type: Constants.CLEAR_SUBJECTS } }
}

function details(id) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api._details(id)
                .then(
                    payload => {
                        dispatch(success(payload));
                        resolve(payload)
                    },
                    error => {
                        dispatch(failure('Failed'));
                        reject(error)
                    }
                )

        });
    }
    function success(payload) { return { type: Constants.SUBJECT_DETAILS, payload } }
    function failure(error) { return { type: Constants.FAILED, error } }
}

function clear_subject() {
    return dispatch => {
        return new Promise((resolve, reject) => {
                dispatch(success());
                resolve()                    
        });
    }
    function success() { return { type: Constants.CLEAR_SUBJECT } }
}
//chapter 
function addChapter(data) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api._addChapter(data)
                .then(
                    payload => {
                        dispatch(success(payload));
                        resolve(payload)
                    },
                    error => {
                        dispatch(failure('Failed'));
                        reject(error)
                    }
                )

        });
    }
    function success(payload) { return { type: Constants.ADD_CHAPTER, payload } }
    function failure(error) { return { type: Constants.FAILED_CHAPTER, error } }
}
function updateChapter(data,chapterID) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api._updateChapter(data,chapterID)
                .then(
                    payload => {
                        dispatch(success(payload));
                        resolve(payload)
                    },
                    error => {
                        dispatch(failure('Failed'));
                        reject(error)
                    }
                )

        });
    }
    function success(payload) { return { type: Constants.UPDATE_CHAPTER, payload } }
    function failure(error) { return { type: Constants.FAILED_CHAPTER, error } }
}
function deleteChapter(chapterID) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api._deleteChapter(chapterID)
                .then(
                    payload => {
                        dispatch(success(payload));
                        resolve(payload)
                    },
                    error => {
                        dispatch(failure('Failed'));
                        reject(error)
                    }
                )

        });
    }
    function success(payload) { return { type: Constants.DELETE_CHAPTER, payload } }
    function failure(error) { return { type: Constants.FAILED_CHAPTER, error } }
}
//topic actions
function addTopic(data,chapterID) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api._addTopic(data,chapterID)
                .then(
                    payload => {
                        dispatch(success(payload));
                        resolve(payload)
                    },
                    error => {
                        dispatch(failure('Failed'));
                        reject(error)
                    }
                )

        });
    }
    function success(payload) { return { type: Constants.ADD_TOPIC, payload } }
    function failure(error) { return { type: Constants.FAILED_TOPIC, error } }
}
function updateTopic(data,chapterID) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api._updateTopic(data,chapterID)
                .then(
                    payload => {
                        dispatch(success(payload));
                        resolve(payload)
                    },
                    error => {
                        dispatch(failure('Failed'));
                        reject(error)
                    }
                )

        });
    }
    function success(payload) { return { type: Constants.UPDATE_TOPIC, payload } }
    function failure(error) { return { type: Constants.FAILED_TOPIC, error } }
}
function deleteTopic(topicID,chapterID) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api._deleteTopic(topicID,chapterID)
                .then(
                    payload => {
                        dispatch(success(payload));
                        resolve(payload)
                    },
                    error => {
                        dispatch(failure('Failed'));
                        reject(error)
                    }
                )

        });
    }
    function success(payload) { return { type: Constants.DELETE_TOPIC, payload } }
    function failure(error) { return { type: Constants.FAILED_TOPIC, error } }
}
//content
function addContent(data,file,topicID,chapterID) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api._addContent(data,file,topicID,chapterID)
                .then(
                    payload => {
                        dispatch(success(payload));
                        resolve(payload)
                    },
                    error => {
                        dispatch(failure('Failed'));
                        reject(error)
                    }
                )

        });
    }
    function success(payload) { return { type: Constants.ADD_CONTENT, payload } }
    function failure(error) { return { type: Constants.FAILED_CONTENT, error } }
}
function deleteContent(chapterID,topicID,contentID) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api._deleteContent(chapterID,topicID,contentID)
                .then(
                    payload => {
                        dispatch(success(payload));
                        resolve(payload)
                    },
                    error => {
                        dispatch(failure('Failed'));
                        reject(error)
                    }
                )

        });
    }
    function success(payload) { return { type: Constants.DELETE_CONTENT, payload } }
    function failure(error) { return { type: Constants.FAILED_CONTENT, error } }
}
function updateContent(data,file,topicID,chapterID) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api._updateContent(data,file,topicID,chapterID)
                .then(
                    payload => {
                        dispatch(success(payload));
                        resolve(payload)
                    },
                    error => {
                        dispatch(failure('Failed'));
                        reject(error)
                    }
                )

        });
    }
    function success(payload) { return { type: Constants.UPDATE_CONTENT, payload } }
    function failure(error) { return { type: Constants.FAILED_CONTENT, error } }
}