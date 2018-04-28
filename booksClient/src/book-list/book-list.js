
import {getBooks, deleteBook} from '../api/bookApi';

export function BookListController() {

  //book-list template
  var getTemplate = function() {
    var template = `
    <div>
    <h1>Books</h1>
    <table class="books-table">
        <thead>
            <th>&nbsp;</th>
            <th>Title</th>
            <th>Author</th>
            <th>Genre</th>
        </thead>
        <tbody id="books">

        </tbody>
          </table>
      </div>
    `
    return template
  }

  // Populate table of books via API call.
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
    
        const deleteLinks = global.document.getElementsByClassName('deleteBook');
    
        // Must use array.from to create a real array from a DOM collection
        // getElementsByClassname only returns an "array like" object
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

  return {
    populateBooks: populateBooks,
    getTemplate: getTemplate
  }
}



