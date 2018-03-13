import axios from 'axios';
import { browserHistory } from 'react-router';
import {
    AUTH_USER,
    UNAUTH_USER,
    AUTH_ERROR,
    FETCH_MESSAGE
} from './types';

const ROOT_URL = 'http://localhost:3090';

export function signUpUser({ email, password }) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signup`, { email, password })
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                browserHistory.push('/feature');
            })
            .catch((err) => {
                dispatch(authError(err.response.data.error));
            });
    };
}

export function signoutUser() {
    localStorage.removeItem('token');
    
    return {
        type: UNAUTH_USER
    };
}

export function signInUser({email, password}) {
    return function(dispatch) {
        axios.post(`${ROOT_URL}/signin`, { email, password })
            .then(response => {
                dispatch({ type: AUTH_USER });
                localStorage.setItem('token', response.data.token);
                browserHistory.push('/feature');
            })
            .catch(() => {
                dispatch(authError('Bad login info'));
            });
    }
}

export function authError(error) {
    return {
        type: AUTH_ERROR,
        payload: error
    };
}

export function fetchSecretMessage() {
    return function(dispatch) {
        axios.get(`${ROOT_URL}`, {
            headers: { authorization: localStorage.getItem('token') }
        }).then(response => {
            dispatch({
                type: FETCH_MESSAGE,
                payload: response.data.message
            })
        });
    };
}