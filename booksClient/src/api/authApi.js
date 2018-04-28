//fetch api polyfill
import 'whatwg-fetch';
import getBaseUrl from './baseUrl'

const baseUrl = getBaseUrl();

export function login() {
    return postLogin('auth/login')
}

export function register() {
    return postRegister('auth/register')
}

export function checkConnectionStatus() {
    return getConnectionStatus('auth/me');
}

function postLogin(url) {
    const request = new Request(baseUrl + url, {
        method: 'POST'
    });
    return fetch(request)
        .then(function(loginData) {
            if (loginData.auth === 'false') {
                console.log('login failed');
                return false;
            }
            sessionStorage.setItem('token', loginData.token);
            return true;
        })
        .catch(function(err) {
            console.log(err);
            return false;
        })
}

function postRegister(url) {

}

function getConnectionStatus(url) {
    const request = new Request(baseUrl + url, {
        method: 'GET',
        headers: {
            'x-access-token' : sessionStorage.getItem('token')
        }
    });
    return fetch(request)
        .then(function(connectionStatus) {
            if (connectionStatus.status == 200 || connectionStatus.auth === 'true') {
                return true;
            } 

            console.log('not connected');
            return false;
            
        })
        .catch(function(err) {
            console.log(err)
        })
}



