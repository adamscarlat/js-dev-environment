import { AuthController } from '../auth/auth';
import { BookListController } from '../book-list/book-list';
import { AuthRouteGuard } from '../router/authRouteGuard';

/*
Defines the routes and their corresponding logic. The routes will be used by the
router to load the route specific logic when navigating to a new route.
This specific route handling is hidden from the router and the route objects
and defined only here.
*/

var bookRoute = Route('#books', function(routerOutlet) {
  var bookListController =  BookListController();
  bookListController.initModule(routerOutlet);
}, AuthRouteGuard())

var authRoute = Route('#auth', function(routerOutlet) {
  var authController =  AuthController();
  authController.initModule(routerOutlet, 'books');
})

var logoutRoute = Route('#logout', function(routerOutlet) {
  var authController =  AuthController();
  authController.logout();
})

/*
Defines the interface for a route. It contains the route path and the route handler.
The router will use this interface when navigating to a new route.
*/
function Route(routePath, routeHandler, routeGuard) {

  var routePath = routePath;
  var routeHandler = routeHandler;
  var routeGuard = routeGuard;

  /*
  Load current route. If route has a route guard, handle it seperatley.
  */
  var load = function(routerOutlet) {
    if (!routeGuard) {
      loadHelper(routerOutlet);
      return;
    }
    handleGuardedRoute(routerOutlet);
  }

  /*
  Use the route handler after emptying the router outlet
  */
  var loadHelper = function(routerOutlet) {
    routerOutlet.empty();
    routeHandler(routerOutlet);
  }

  /*
  go through it first and only
  continue to route if the route guard canAuthenticate method returns true
  */
  var handleGuardedRoute = function(routerOutlet) {
    routeGuard.canContinue()
    .then(function(isOK) {
      if (isOK) {
        loadHelper(routerOutlet);
        return;
      }
      routeGuard.fallback();
    })
  }

  //route API
  return {
    load: load,
  }
}

//Routes collection to be used by the router
export var routes = {
  'books': bookRoute,
  'auth': authRoute,
  'logout': logoutRoute,
  '*' : bookRoute
}


