import './auth.css' 

import { checkConnectionStatus, login, logout, register } from '../api/authApi';
import authTemplate from './auth.html'
import { Router } from '../router/router'
import { promisify } from 'util';

/*
Logic related to the authentication screen.
*/
export function AuthController() {

    var continueToOnSuccess;
    var loginFormElement;
    var registerFormElement;

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
        //don't even call remote if there's no token
        if (sessionStorage.getItem('token') === null) {
            return Promise.resolve(false);
        } 

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
                    return;
                }
                $(".login-errors").show();
            })
            .catch(function(err) {
                console.log(err)
            })
    }

    /*
    Logout and navigate to the auth page
    */
    var attemptLogout = function() {
        logout();
        Router().navigateTo("auth");
    }

    /*
    Given a name, an email and a user name, it attempts a register a new user using the auth API.
    Upon successful registration, it uses the router services to navigate to the 
    continueToOnSuccess location. It also saves user's name in the sessionStorage.
    */
    var attemptRegister = function(name, email, password) {
        register(name, email, password)
            .then(function(isAuthenticated) {
                if (isAuthenticated) {
                    $('#logout').show();
                    sessionStorage.setItem('name', name);
                    Router().navigateTo(continueToOnSuccess);
                    return;
                }
                $(".registration-errors").show();
            })
            .catch(function(err) {
                console.log(err)
            })
    }

    /*
    Confirm that the password field and the confirm password field match
    */
    var confirmPasswordMatch = function() {
        var confirmPassword = $("#confirmPasswordRegiter").val();
        var password = $("#passwordRegister").val();
        if (confirmPassword !== password) {
            $("#confirmPasswordRegiter")[0].setCustomValidity('Password Must be Matching.');
        } else {
            $("#confirmPasswordRegiter")[0].setCustomValidity('');
        }
    } 

    /*
    Register any callbacks of elements on the authentication screen
    */
    var registerCallbacks = function() {
        //register the onSubmit callback for the login form
        loginFormElement.submit(function() {
            event.preventDefault();
            var email = $("#emailLogin").val();
            var password = $("#passwordLogin").val();
            attemptLogin(email, password);
        });

        //register the confirm password match validation callback
        $("#confirmPasswordRegiter").focusout(function() {
            confirmPasswordMatch();
        })

        //register registration submit element
        registerFormElement.submit(function() {
            event.preventDefault();
            var name = $("#nameRegister").val();
            var email = $("#emailRegiter").val();
            var password = $("#passwordRegister").val();
            attemptRegister(name, email, password);
        })
    }

    /*
    Init the auth controller. Set the parentDiv, continueTo operation
    and registerCallbacks.
    */
    var initModule = function(parentDiv, continueTo) {
        continueToOnSuccess = continueTo;
        parentDiv.append(getTemplate);
        loginFormElement = $("#loginForm");
        registerFormElement = $("#registerForm");
        registerCallbacks()
    }

    //controller API
    return {
        isAuthenticated: isAuthenticated,
        initModule: initModule,
        getTemplate: getTemplate,
        logout: attemptLogout
    }
}
