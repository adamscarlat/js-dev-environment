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
    return postLogin('auth/login', username, password)
}

export function register() {
    return postRegister('auth/register')
}

/*
Checks the connection status using the token that's currently
in sessionStorage. 
Returns a Promise<boolean> object.
*/
export function checkConnectionStatus() {
    return getConnectionStatus('auth/me');
}

/*
Logs in and if successful, stores the result token in 
sessionStorage.
Returns a Promise<boolean> object.
*/
function postLogin(url, email, password) {
    //creates a post request of type form-urlencoded
    const searchParams = new URLSearchParams();
    searchParams.set('email', email);
    searchParams.set('password', password);

    const request = new Request(baseUrl + url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: searchParams
    });
    return fetch(request)
        .then(function(response) { return response.json()})
        .then(function(loginData) {
            if (loginData.auth && loginData.token !== undefined) {
                sessionStorage.setItem('token', loginData.token);
                return true;
            }
            console.log('login failed');
            return false;
        })
        .catch(function(err) {
            console.log(err);
            return false;
        })
}

function postRegister(url) {

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



