var booksMiddleware = function(Book) {

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