var createError = require('http-errors');
var express = require('');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var icecreamRouter = require('./routes/icecreams');
var boardRouter = require('./routes/board');
var chooseRouter = require('./routes/choose');
var icecream = require("./models/icecream");
var resourceRouter = require('./routes/resource');

require('dotenv').config();
const connectionString = process.env.MONGO_CON
mongoose = require('mongoose');
mongoose.connect('mongodb+srv://dharanipuppala7:DHARANI7@cluster0.gqlx2tv.mongodb.net/?retryWrites=true&w=majority');
//const db = mongoose.connection;
//db.on('error', console.error.bind(console, 'MongoDB connection error:'));
//db.once('open', function () {
  //console.log('Connection to DB succeeded');
//});
// mongoose.connect('mongodb+srv://dharanipuppala7:DHARANI7@cluster0.gqlx2tv.mongodb.net/?retryWrites=true&w=majority').
// then(() => {
//     console.log("DB connected");
//     async function recreateDB() {
//       // Delete everything
//       await Costume.deleteMany();
//       //one instance
//       let instance1 = new Costume({ costume_type: "ghost", size: 'large', cost: 15.4 });
//       let instance2 = new Costume({ costume_type: "shirt", size: 'medium', cost: 19.4 });
//       let instance3 = new Costume({ costume_type: "tshirt", size: 'small', cost: 10.3 });
//       instance1.save().then(doc => {
//         console.log("First object saved")
//       }
//       ).catch(err => {
//         console.error(err)
//       });
//       instance2.save().then(doc => {
//         console.log("Second object saved")
//       }
//       ).catch(err => {
//         console.error(err)
//       });
//       instance3.save().then(doc => {
//         console.log("Third object saved")
//       }
//       ).catch(err => {
//         console.error(err)
//       });
  
//     }
// })

// .catch((err) => console.log(err.message))

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/icecream', icecreamRouter);
app.use('/board', boardRouter);
app.use('/choose', chooseRouter);
app.use('/resource', resourceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
console.log("Connection to DB succeeded")});

// We can seed the collection if needed on
//server start
async function recreateDB(){
// Delete everything
await icecream.deleteMany();
let instance1 = new icecream({cone:"small", flavour:'venilla',price:14.5});
instance1.save().then(doc=>{
console.log("First object saved")}
).catch(err=>{
console.error(err)
});


let instance2 = new icecream({cone:"medium", flavour:'Chocolate',price:5.4});
instance2.save().then(doc=>{
console.log("second object saved")}
).catch(err=>{
console.error(err)
});


let instance3 = new icecream({cone:"large", flavour:'Butterscotch',price:1.4});
instance3.save().then(doc=>{
console.log("Third object saved")}
).catch(err=>{
console.error(err)
});
}
let reseed = true;
if (reseed) {recreateDB();}


module.exports = app;
