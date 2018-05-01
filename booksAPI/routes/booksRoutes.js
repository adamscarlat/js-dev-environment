var express = require('express');

// route- /api/books
var routes = function(Book) {
  
  var bookController = require('../controllers/booksController')(Book)
  
  var bookRouter = express.Router();
  //get all books or by genre
  bookRouter.route('/')
    .post(bookController.post)
    .get(bookController.get);

  //middleware to find a book by id
  var bookMiddleware = require('../middleware/booksMiddleware')(Book)
  bookRouter.use('/:bookId', bookMiddleware.findBookById);

  //get book by id - using middleware
  bookRouter.route('/:bookId')
    .get(bookController.getById)
    .put(bookController.put)
    .patch(bookController.patch)
    .delete(bookController.delete)

  return bookRouter;
};

module.exports = routes;


