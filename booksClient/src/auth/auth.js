import { checkConnectionStatus, login } from '../api/authApi';
import authTemplate from './auth.html'
import { Router } from '../router/router'

/*
Logic related to the authentication screen.
*/
export function AuthController() {

    var continueToOnSuccess;
    var formElement;

    /*
    Returns the html of the authentication screen. 
    */
    var getTemplate = function() {
        return authTemplate
    }

    /*
    Checks if the current session is authenticated using the auth API.
    Returns a Promise<boolean> object.
    */
    var isAuthenticated = function() {
       return checkConnectionStatus()
            .then(function(isAuthenticated) {
                return isAuthenticated;
            })
            .catch(function(err) {
                console.log(err);
                return false;
            })
    }

    /*
    Given an email and a user name, it attempts a login using the auth API.
    Upon successful login, it uses the router services to navigate to the 
    continueToOnSuccess location.
    */
    var attemptLogin = function(email, password) {
        login(email, password)
            .then(function(isAuthenticated) {
                if (isAuthenticated) {
                    Router().navigateTo(continueToOnSuccess);
                }
            })
            .catch(function(err) {
                console.log(err)
            })
    }

    /*
    Register any callbacks of elements on the authentication screen
    */
    var registerCallbacks = function() {
        //register the onSubmit callback for the login form
        formElement.submit(function() {
            event.preventDefault();
            var email = $("#email").val();
            var password = $("#password").val();
            attemptLogin(email, password);
        });
    }

    /*
    Init the auth controller. Set the parentDiv, continueTo operation
    and registerCallbacks.
    */
    var initModule = function(parentDiv, continueTo) {
        continueToOnSuccess = continueTo;
        parentDiv.append(getTemplate);
        formElement = $("#loginForm");
        registerCallbacks()
    }

    //controller API
    return {
        isAuthenticated: isAuthenticated,
        initModule: initModule,
        getTemplate: getTemplate
    }
}
