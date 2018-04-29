var express =  require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

//db connection
var mongoose = require('mongoose');
//var db = mongoose.connect('mongodb://superuser1024:a1b2c3d4@ds259109.mlab.com:59109/demo-api-db')
var db = mongoose.connect('mongodb://localhost/bookAPI')

const app = express();
app.use(cors());
app.set('port', (process.env.PORT || 5000));

//parse url encoded data and the body of post requests
app.use(bodyParser.urlencoded({extended: true})); //If extended is false, you can not post "nested object"
app.use(bodyParser.json());

//models imports
var Book = require('./models/bookModel');
var User = require('./models/userModel');

//book router
var bookRouter = require('./routes/booksRoutes')(Book);
app.use('/api/books', bookRouter);

//auth router
var authRouter = require('./routes/authRouter')(User);
app.use('/api/auth', authRouter);

app.get('/', function(request, response) {
  response.send('API Test')
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port')); 
});