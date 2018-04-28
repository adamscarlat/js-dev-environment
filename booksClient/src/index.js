import './index.css'

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
  var parentDiv = $("#books-app");

  var initBookListModule = function() {
    parentDiv.empty(); 
    bookListController.initModule(parentDiv);
  }

  var initAuthModule = function(continueToCallback) {
    parentDiv.empty();
    authController.initModule(parentDiv, continueToCallback);
  }

  var initModule = function() {
    // authController.isAuthenticated()
    //   .then(function(isAuthenticated) {
    //     if (isAuthenticated) {
    //       initBookListModule();
    //       return;
    //     } 
    //     initAuthModule(initBookListModule);
    //   })    
    //initAuthModule(initBookListModule);
    initBookListModule()
  }

  return {
    initModule: initModule
  }

}