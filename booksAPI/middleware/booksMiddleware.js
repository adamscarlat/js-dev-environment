var booksMiddleware = function(Book) {

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

	return {
		findBookById: findBookById
	}
}

module.exports = booksMiddleware