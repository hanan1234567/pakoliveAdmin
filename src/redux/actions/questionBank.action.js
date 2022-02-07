import { QuestionBankConstants as Constants } from '../types'
import { questionBankApi as api } from '../../api'

export const questionBankAction = {
    get,
    getByTags,
    clearTags,
    add,
    update,
    remove
 
};


function get(quizID) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api._get(quizID)
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

function getByTags(tags,quizID,userID=false) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api._getByTags(tags,quizID,userID)
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
    function success(payload) { return { type: Constants.GETBYTAGS, payload } }
    function failure(error) { return { type: Constants.FAILED, error } }
}

function clearTags() {
    return { type: Constants.CLEAR, payload:[] } 
}

function add(qBQuestions,newQuestions,quizQuestions,contentID) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api._add(qBQuestions,newQuestions,quizQuestions,contentID)
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

function update(data,file,quizID) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api._update(data,file,quizID)
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

function remove(contentID) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api._delete(contentID)
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