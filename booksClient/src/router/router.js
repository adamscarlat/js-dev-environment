import { BookListController } from '../book-list/book-list'
import { AuthController } from '../auth/auth'

/*
Routing manager. Handles any changes in the url.
*/
export function Router() {

    var routerOutlet;
    var bookListController;
    var authController;

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
        $(window).bind('hashchange', function() {
            if (window.location.hash === '#auth') initAuthModule('books');
            if (window.location.hash === '#books') initBookListModule();
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



