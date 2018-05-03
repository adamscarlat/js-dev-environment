var booksMiddleware = function(Book, bookSocket) {

    /*
    Find book by id. This middleware runs before any book fetch that gets an id 
    parameter. After this function runs, the req.book value will be populated 
    if the book was found.
    */
    var findBookById = function(req, res, next) {
        Book.findById(req.params.bookId, function(err, book) {
            if (err) res.status(500).send(err);
            else if (book) {
               req.book = book;
               next();
            }
            else return res.status(404).send('no such book found');
        });
    }

    /*
    Get all books and broadcast using the websocket. This middleware runs after 
    any successful post/patch/put/delete request. It gets all the books and 
    broadcasts them to whoever is listening on the books channel.  
    */
    var notifyBooksUpdate = function(req, res, next) {
        var returnBooks = [];
        Book.find({}, function(err, books) {
            if (err) console.log(err)
            else {
                //add links to the book elements
                books.forEach(element => {
                    var newBook = element.toJSON();
                    newBook.links = {};
                    newBook.links.self = 'http://' + req.headers.host + '/api/books/' + newBook._id;
                    returnBooks.push(newBook);
                });
                bookSocket.booksUpdate(returnBooks);
            }
            next();
        });
    }

    return {
        findBookById: findBookById,
        notifyBooksUpdate: notifyBooksUpdate
    }
}

module.exports = booksMiddleware