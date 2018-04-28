import { checkConnectionStatus } from '../api/authApi';

export function AuthController() {

    var isAuthenticated = function() {
        return checkConnectionStatus()
            .then(function(isAuthenticated) {
                return isAuthenticated;
            })
    }

    return {
        isAuthenticated: isAuthenticated
    }
}
