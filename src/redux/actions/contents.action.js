import { ContentsConstants as Constants } from '../types'
import { contentsApi as api } from '../../api'

export const contentsAction = {
    get,
    add,
    update,
    remove
 
};


function get(topicID) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api._get(topicID)
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

function add(data,file,topicID) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api._add(data,file,topicID)
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

function update(data,file,contentID) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api._update(data,file,contentID)
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