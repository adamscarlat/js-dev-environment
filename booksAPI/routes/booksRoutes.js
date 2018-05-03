var express = require('express');

// route- /api/books
var routes = function(Book, bookSocket) {
  
  var bookController = require('../controllers/booksController')(Book)
  var bookMiddleware = require('../middleware/booksMiddleware')(Book, bookSocket)

  var bookRouter = express.Router();
  //get all books or by genre
  bookRouter.route('/')
    .post(bookController.post, bookMiddleware.notifyBooksUpdate) //using web socket update notifications
    .get(bookController.get);

  bookRouter.use('/:bookId', bookMiddleware.findBookById); //using middleware to find a book by id

  //get book by id - using middleware
  bookRouter.route('/:bookId')
    .get(bookController.getById)
    .put(bookController.put, bookMiddleware.notifyBooksUpdate)       //using web socket update notifications
    .patch(bookController.patch, bookMiddleware.notifyBooksUpdate)   //using web socket update notifications
    .delete(bookController.delete, bookMiddleware.notifyBooksUpdate) //using web socket update notifications

  return bookRouter;
};

module.exports = routes;


