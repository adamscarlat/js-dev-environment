/*
API of all authentication related operations. This includes:
1. Login
2. Registration
3. Checking connection status
*/

//fetch api polyfill
import 'whatwg-fetch';
import getBaseUrl from './baseUrl'

const baseUrl = getBaseUrl();

/*
Given username and password, send a post request for login.
Returns a Promise<boolean> object.
*/
export function login(username, password) {
    return postLogin('api/auth/login', username, password)
}

/*
Clear user session
*/
export function logout() {
    sessionStorage.clear();
}

export function register(name, email, password) {
    return postRegister('api/auth/register', name, email, password)
}

/*
Checks the connection status using the token that's currently
in sessionStorage.
Returns a Promise<boolean> object.
*/
export function checkConnectionStatus() {
    return getConnectionStatus('api/auth/me');
}

/*
Logs in and if successful, stores the result token in
sessionStorage.
Returns a Promise<boolean> object.
*/
function postLogin(url, email, password) {

    var request = createFormEncodedRequest({
        'email': email,
        'password': password
    }, url)

    return fetch(request)
        .then(function(response) { return response.json()})
        .then(function(responseData) {
            return validateToken(responseData);
        })
        .catch(function(err) {
            console.log(err);
            return false;
        })
}

/*
Registers a new user and if successful, stores the result token in
sessionStorage.
Returns a Promise<boolean> object.
*/
function postRegister(url, name, email, password) {
    var request = createFormEncodedRequest({
        'name': name,
        'email': email,
        'password': password
    }, url)

    return fetch(request)
    .then(function(response) { return response.json()})
    .then(function(responseData) {
        return validateToken(responseData);
    })
    .catch(function(err) {
        console.log(err);
        return false;
    })
}

/*
Checks connection status using the token found in the sessionStorage.
It sends the token to the server, which validates it.
Returns a Promise<boolean> object.
*/
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

/*
Creates a post request of type form-urlencoded
*/
function createFormEncodedRequest(params, url) {
    var searchParams = new URLSearchParams();
    for (let key in params) {
        searchParams.set(key, params[key])
    }

    const request = new Request(baseUrl + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: searchParams
    });

    return request;
}

function validateToken(responseData) {
    if (responseData.auth && responseData.token !== undefined) {
        sessionStorage.setItem('token', responseData.token);
        return true;
    }
    return false;
}

