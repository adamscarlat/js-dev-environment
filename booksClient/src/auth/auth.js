import { checkConnectionStatus } from '../api/authApi';
import authTemplate from './auth.html'

export function AuthController() {

    var callbackSuccessfulLogin;

    var getTemplate = function() {
        return authTemplate
    }

    var isAuthenticated = function() {
        return checkConnectionStatus()
            .then(function(isAuthenticated) {
                return isAuthenticated;
            })
    }

    var initModule = function(parentDiv, continueTo) {
        callbackSuccessfulLogin = continueTo;
        parentDiv.append(getTemplate);
        $("#loginForm").submit(function(){console.log("form submit")})
    }

    return {
        isAuthenticated: isAuthenticated,
        initModule: initModule,
        getTemplate: getTemplate
    }
}
