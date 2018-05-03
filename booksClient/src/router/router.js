import { BookListController } from '../book-list/book-list';
import { AuthController } from '../auth/auth';
import { routes } from './routes';

/*
Routing manager. Handles any changes in the url.
*/
export function Router() {

    var routerOutlet;

    /*
    Bind the routing event handlders that operate upon URL change
    */
   var bindRoutingEvents = function() {
    $(window).on('hashchange', function() {
        var routeName = window.location.hash.slice(1);
        if (routes[routeName]) {
          routes[routeName].load(routerOutlet);
          return;
        }
        console.log("Page not found...")
    })
  }

    /*
    Change the hash symbol to navigate to a new page. This will trigger an
    event handler (see bindRoutingEvents).
    */
    var navigateTo = function(location) {
        window.location.hash = '#' + location;
    }

		/*
		Decide wether the navigation should go to the 'home' screen or
		in-case of a refresh (for example) remain on the same page
		*/
    var initialNavigation = function() {
				var currentLocation = window.location.hash;
				//different than the initial - handle refresh
        if (currentLocation && currentLocation !== '#') {
						$(window).trigger('hashchange');
						return;
				}
				//initial navigation - to main page
				navigateTo('*');
    }

    /*
    Init module. bind any routing events
    */
    var initModule = function(routerOutletElement) {
        routerOutlet = routerOutletElement;
				bindRoutingEvents();
				initialNavigation();
    }

    //Router API
    return {
        initModule: initModule,
        navigateTo: navigateTo
    }
}




