/*
API of all books related verbs.
*/

//fetch api polyfill
import 'whatwg-fetch';
import getBaseUrl from './baseUrl'

const baseUrl = getBaseUrl();

export function getBooks() {
  return get('books');
}

export function deleteBook(id) {
  return del(`books/${id}`);
}

function get(url) {
  return fetch(baseUrl + url).then(onSuccess, onError);
}

// Can't call func delete since reserved word.
function del(url) {
  const request = new Request(baseUrl + url, {
    method: 'DELETE'
  });

  return fetch(request).then(onSuccess, onError);
}

function onSuccess(response) {
  return response.json();
}

function onError(error) {
  console.log(error); // eslint-disable-line no-console
}
