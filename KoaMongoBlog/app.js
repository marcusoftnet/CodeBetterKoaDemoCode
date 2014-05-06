// Dependencies.
var logger = require('koa-logger');
var route = require('koa-route');
var koa = require('koa');
var app = module.exports = koa();

// middleware
app.use(logger());

// route middleware
var routes = require('./blogRoutes.js');
app.use(route.get('/', routes.list));
app.use(route.get('/post/new', routes.add));
app.use(route.get('/post/:id', routes.show));
app.use(route.post('/post', routes.create));
app.use(route.post('/post/:id', routes.update));
app.use(route.get('/post/:id/edit', routes.edit));
app.use(route.get('/post/:id/delete', routes.remove));

// listen
app.listen(3000);
console.log('Blog engine fired up on http://localhost:3000');