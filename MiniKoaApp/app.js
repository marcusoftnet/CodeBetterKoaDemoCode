// Depenendcies
var koa = require('koa');
var app = koa();
var logger = require('koa-logger');
var route = require('koa-route');

// Db access
var monk = require('monk');
var wrap = require('co-monk');
var db = monk('localhost/koaDemoUsers');
var users = wrap(db.get('users'));

// Middleware
app.use(logger());

// Route
app.use(route.get('/user/:name', getUser));

function *getUser(userName) {
  var user = yield users.findOne({name:userName});
  if (!user) this.throw(404, 'invalid user name');
  this.body = user;
};

// Fire it  up
app.listen(3000);
console.dir("The app is up on http://localhost:3000");