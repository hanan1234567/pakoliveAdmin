import { SliderConstants as Constants } from '../types'
import { sliderApi as api } from '../../api'

export const sliderAction = {
    get,
    add,
    update,
    remove
}
function get() {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api._get()
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
function update(data) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api._update(data)
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

function remove(slideID) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api._delete(slideID)
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

