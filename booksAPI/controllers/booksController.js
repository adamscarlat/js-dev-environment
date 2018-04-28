//defines the callbacks the book router uses
var bookController = function(Book) {

	var post = function(req, res) {
		var book = new Book(req.body);

		if (!req.body.title) {
			res.status(400)
			res.send('Title is required')
		} else {
			book.save();
			res.status(201)
			res.send(book);
		}
	}

	var get = function(req, res) {
		//see if the request has a parameter called 'genre'
		var query = {};
		if (req.query.genre) {
			query.genre = req.query.genre;
		}
		Book.find(query, function(err, books) {
			if (err) res.status(500).send(err);
			else {
				//add links to the book elements
				var returnBooks = [];
				books.forEach(element => {
					var newBook = element.toJSON();
					newBook.links = {};
					newBook.links.self = 'http://' + req.headers.host + '/api/books/' + newBook._id;
					returnBooks.push(newBook);
				});
				res.json(returnBooks);
			}
		});
	}

	var getById = function(req, res) {
		//add link to filter by this genre
		var returnBook = req.book.toJSON(); //req.book is populated in the middleware if a book is found
		returnBook.links = {};
		var newLink = 'http://' + req.headers.host + '/api/books/?genre=' + returnBook.genre;
		returnBook.links.FilterByThisGenre = newLink.replace(' ', '%20');
		res.json(returnBook); 
	}

	var put = function(req, res) {
		Book.findById(req.params.bookId, function(err, book) {
			//a book was found, replace it with request body and save.
			//req.book is populated in the middleware if a book is found.
			 var book = req.book;
			 book.title = req.body.title;
			 book.author = req.body.author;
			 book.genre = req.body.genre;
			 book.read = req.body.read;
			 req.book.save(function(err) {
			   if (err) res.status(500).send(err);
			   else res.json(req.book);
			 })
		 })
	}

	var patch = function(req, res) {
		if (req.body._id) delete req.body._id //we don't want to update the id.
		for (var key in req.body) {
			req.book[key] = req.body[key];
		}
		req.book.save(function(err) {
			if (err) res.status(500).send(err);
			else res.json(req.book);
		})
	}

	var del = function(req, res) {
		req.book.remove(function(err) {
			if (err) res.status(500).send(err);
			else res.status(204).send('Removed');
		})
	}

	return {
		post: post,
		get: get,
		getById: getById,
		put: put,
		patch: patch,
		delete: del
	}
}

module.exports = bookController;