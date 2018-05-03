/*
Manages new socket connections and websockets messages for anything books related,
Takes a socket-io object as input (see socket.io docs)
*/
var booksSocketManager = function(io) {

    const booksNamespace = '/books';
    const booksUpdateChannel = 'books-update';
    var sockets = {}

    /*
    start a websocket in the booksNamespace and bind to the new connection event.
    */
    var init = function() {
        var nsBooks = io.of(booksNamespace);
        nsBooks.on('connection', handleNewConnection);
    }

    /*
    New connection event handler. Log the connection, define the disconnect event and 
    store the socket in a collection.
    */
    function handleNewConnection(socket) {
        console.log('books-socket: a user connected with id %s', socket.id);
        
        socket.on('disconnect', function() {
            handleDisconnect(socket);
        })
        sockets[socket.id] = socket;
    }

    /*
    Disconnect event handler. Log the event and delete the socket from the collection.
    */
    function handleDisconnect(socket) {
        console.log('books-socket: a user disconnected with id %s', socket.id);
        if (sockets[socket.id]) delete sockets[socket.id];
    }

    /*
    Books update event handler. It sends the books to all the sockets in the
    socket collection.
    */
    function onBooksUpdateHandler(books) {
        //notify update to all sockets (except the emitting socket)
        for (let socketId in sockets) {
            sockets[socketId].emit(booksUpdateChannel, books);
        }
    }

    return {
        init: init,
        booksUpdate: onBooksUpdateHandler
    }
}

module.exports = booksSocketManager;