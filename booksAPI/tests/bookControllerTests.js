var should = require('should');
var sinon = require('sinon');

describe('Book Controller Tests: ', function() {
	describe('Post', function() {
		it('should not allow an empty title on post', function() {
			//mocking Book model
			var Book = function(book) {
				this.save = function() {} //mocking the Book.save method 
			}

			//mock a request object
			var req = {
				body: {
					author: "Adam"
				}
			}

			//mock a response using sinon
			var res = {
				status: sinon.spy(), //sinon.spy will track if the methods were called
				send: sinon.spy()
			}

			//act
			var bookController = require('../controllers/booksController')(Book);
			bookController.post(req, res);

			//assert
			res.status.calledWith(400).should.equal(true, 'Bad status ' + res.status.args[0][0])
			res.send.calledWith('Title is required').should.equal(true);
		})
	})
})