import { AuthController } from '../auth/auth';
import { Router } from './router';

/*
Route guard that checks if the user is authenticated before continuing
to the route.
*/
export function AuthRouteGuard() {
  var authController = AuthController();
  var router = Router();

  /*
  Returns a boolean promise wether the user can continue to the route.
  */
  var canContinue = function() {
    return authController.isAuthenticated()
      .then(function(isAuthenticated) {
        return isAuthenticated;
      })
  }

  /*
  Incase canContinue returns false, it is possible to define a fallback function that
  the route will use.
  */
  var fallback = function() {
    router.navigateTo('auth')
  }

  //Route guard API
  return {
    canContinue: canContinue,
    fallback: fallback
  }
}
