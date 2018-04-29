import './index.css'

import { BookListController } from './book-list/book-list'
import { AuthController } from './auth/auth'
import { Router } from './router/router'

$(document).ready(function() {
  var booksAppController = BooksAppController();
  booksAppController.initModule();
})

/*
Application entry point controller.
*/
export function BooksAppController() {
  var authController = AuthController();
  var router = Router();
  var parentDiv = $("#books-app");

  //Init module and navigate to the start screen if authenticated.
  //Else, navigate to the auth screen.
  var initModule = function() {
    router.initModule(parentDiv);

    authController.isAuthenticated()
      .then(function(isAuthenticated) {
        if (!isAuthenticated) {
          router.navigateTo('auth')
          return;
        }
        router.navigateTo('books')
      })
  }

  //Controller API
  return {
    initModule: initModule
  }

}