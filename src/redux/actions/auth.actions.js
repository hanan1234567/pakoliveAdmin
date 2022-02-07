import { AuthConstants as Constants } from '../types'
import { authApi as api } from '../../api'

export const authAction = {
    login,
    logout,
    refresh_token
};

function login(form_data) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api._login(form_data)
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
    function success(payload) { return { type: Constants.LOGIN, payload } }
    function failure(error) { return { type: Constants.FAILED, error } }
}

function logout() {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api._logout()
                .then(
                    payload => {
                        dispatch(success());
                        resolve()
                    },
                    error => {
                        dispatch(failure('Failed'));
                        reject(error)
                    }
                )
        });
    function success() { return { type: Constants.LOGOUT } }
    function failure() { return { type: Constants.FAILED } }
    }
}

function refresh_token(token) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            api._refresh(token)
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
    function success(payload) { return { type: Constants.REFRESH_TOKEN, payload } }
    function failure(error) { return { type: Constants.REFRESH_TOKEN_FAILED, error } }
}