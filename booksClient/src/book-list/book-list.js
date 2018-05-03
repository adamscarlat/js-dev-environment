import {getBooks, deleteBook} from '../api/bookApi';
import bookListTemplate from './book-list.html'
import './book-list.css'
import { Router } from '../router/router'
import  getBaseUrl  from '../api/baseUrl'

/*
Logic related to the book-list screen
*/
export function BookListController() {

	var socket;

  /*
  Returns the html of the book-list screen.
  */
  var getTemplate = function() {
    return bookListTemplate
  }

  /*
  Populate table of books via API call to the bookAPI.
  */
  var populateBooks = function() {
    getBooks().then(result => {
      populateBooksTableElement(result);
    })
  }

  /*
  Given a list of books, populate and attach the books table
  */
  var populateBooksTableElement = function(books) {
    let booksBody = "";
    books.forEach(book => {
      booksBody+= `<tr>
        <td><a href="#" data-id="${book._id}" class="deleteBook">Delete</a></td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.genre}</td>
        </tr>`
    });
    global.document.getElementById('books').innerHTML = booksBody;
    registerDeleteLinkCallback();
  }

  /*
  Register the delete links to the books entries in the books table.
  */
  var registerDeleteLinkCallback = function() {
    //register the callback to the delete link of each book.
    const deleteLinks = global.document.getElementsByClassName('deleteBook');
    Array.from(deleteLinks, link => {
      link.onclick = function(event) {
        const element = event.target;
        event.preventDefault();
        deleteBook(element.attributes["data-id"].value)
        .then(() => {
            const row = element.parentNode.parentNode;
            row.parentNode.removeChild(row);
        })
      };
    });
  }

  /*
  Register any callbacks of elements on the booklist screen
  */
  var registerCallbacks = function() {
    $("#logout").click(function() {
			event.preventDefault();
			socket.disconnect();
      Router().navigateTo('logout');
    })
  }

  /*
  Resigter the socket-io channels
  */
  var registerSocketIO = function() {
    var baseUrl = getBaseUrl();
    var booksSocketUrl = baseUrl + 'books'
    socket = io.connect(booksSocketUrl);
    socket.on('books-update', function(books) {
      populateBooksTableElement(books)
    });
  }

  /*
  Init module. Set the parentDiv and populate the list of books.
  */
  var initModule = function(parentDiv) {
		parentDiv.append(getTemplate());
    populateBooks();
    registerCallbacks();
    registerSocketIO();
  }

  //contoller API.
  return {
    populateBooks: populateBooks,
    getTemplate: getTemplate,
    initModule: initModule
  }
}



