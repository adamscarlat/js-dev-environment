import {getBooks, deleteBook} from '../api/bookApi';
import bookListTemplate from './book-list.html'
import './book-list.css'
import { AuthController } from '../auth/auth'

/*
Logic related to the book-list screen
*/
export function BookListController() {

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
      let booksBody = "";
    
      result.forEach(book => {
        booksBody+= `<tr>
          <td><a href="#" data-id="${book._id}" class="deleteBook">Delete</a></td>
          <td>${book.title}</td>
          <td>${book.author}</td>
          <td>${book.genre}</td>
          </tr>`
      });
        global.document.getElementById('books').innerHTML = booksBody;

        //register the callback to the delete link of each book.
        const deleteLinks = global.document.getElementsByClassName('deleteBook');
        Array.from(deleteLinks, link => {
          link.onclick = function(event) {
            const element = event.target;
            event.preventDefault();
            deleteBook(element.attributes["data-id"].value);
            const row = element.parentNode.parentNode;
            row.parentNode.removeChild(row);
          };
        });
    })
  }

  /*
  Register any callbacks of elements on the booklist screen
  */
  var registerCallbacks = function() {
    $("#logout").click(function() {
      event.preventDefault();
      AuthController().logout();
    })
  }

  /*
  Init module. Set the parentDiv and populate the list of books.
  */
  var initModule = function(parentDiv) {
    parentDiv.append(getTemplate());
    populateBooks();
    registerCallbacks();
  }

  //contoller API.
  return {
    populateBooks: populateBooks,
    getTemplate: getTemplate,
    initModule: initModule
  }
}



