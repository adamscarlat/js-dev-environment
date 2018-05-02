import { BookListController } from '../book-list/book-list'
import { AuthController } from '../auth/auth'

/*
Routing manager. Handles any changes in the url.
*/
export function Router() {

    var routerOutlet;
    var bookListController;
		var authController;
		var oldHash;
		var newHash;

    /*
    Init the book-list module.
    */
    var initBookListModule = function() {
        bookListController =  BookListController();
        routerOutlet.empty();
        bookListController.initModule(routerOutlet);
    }

    /*
    Init the authentication module.
    */
    var initAuthModule = function(continueTo) {
        authController = AuthController();
        routerOutlet.empty();
        authController.initModule(routerOutlet, continueTo);
    }

    /*
    Bind the routing event handlders that operate upon URL change
    */
    var bindRoutingEvents = function() {
        $(window).on('hashchange', function() {
						//prevent multiple firings of this event
						if (window.location.hash === oldHash) return;

						newHash = window.location.hash;

            if (newHash === '#auth') initAuthModule('books');
            if (newHash === '#books') initBookListModule();
            if (newHash === '#logout') AuthController().logout();

						oldHash = newHash;
        })
    }

    /*
    Change the hash symbol to navigate to a new page. This will trigger an
    event handler (see bindRoutingEvents).
    */
    var navigateTo = function(location) {
        window.location.hash = '';
				window.location.hash = '#' + location;
    }

    /*
    Init module. bind any routing events
    */
    var initModule = function(routerOutletElement) {
        routerOutlet = routerOutletElement;
        bindRoutingEvents();
    }

    //Router API
    return {
        initModule: initModule,
        navigateTo: navigateTo
    }
}




