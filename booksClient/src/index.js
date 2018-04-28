import './index.css'
import './book-list/book-list.css'

import { BookListController } from './book-list/book-list'
import { AuthController } from './auth/auth'

$(document).ready(function() {
  var booksAppController = BooksAppController();
  booksAppController.initModule();
})

export function BooksAppController() {
  var isAuthenticated = true;
  var bookListController =  BookListController();
  var authController = AuthController()

  var initBookListModule = function() {
    $("#books-app").append(bookListController.getTemplate());
    bookListController.populateBooks();
  }

  var initAuthModule = function() {
    
  }

  var initModule = function() {
    authController.isAuthenticated()
      .then(function(isAuthenticated) {
        if (isAuthenticated) {
          initBookListModule();
          return;
        } 
          //auth controller init - login/register page
      })
    
  }

  return {
    initModule: initModule
  }

}