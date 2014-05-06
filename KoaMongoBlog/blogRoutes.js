// dependencies
var parse = require('co-body');
var render = require('./render.js');

// Set up monk
var monk = require('monk');
var wrap = require('co-monk');
var db = monk('localhost/koaMongoBlog');
var posts = wrap(db.get('posts'));
module.exports.posts = posts; // Let's expose the posts collection for testing

// And now... the route definitions
// List posts
module.exports.list = function *() {
  var postList = yield posts.find({});
  this.body = yield render('list', { posts: postList });
};

// Show creation form.
module.exports.add = function *() { 
  this.body = yield render('new');
};

// Show post for id.
module.exports.show = function *(id) {
  var post = yield posts.findOne({_id:id});
  if (!post) this.throw(404, 'invalid post id');
  this.body = yield render('show', { post: post });
};

// create new post
module.exports.create = function *() {
  var post = yield parse(this); // parses the incoming request (this) into an object
  post.created_at = new Date();

  yield posts.insert(post);
  this.redirect('/');
};

// Show edit form
module.exports.edit = function *(id) {
  var post = yield posts.findOne({_id:id});
  this.body = yield render('edit', { post: post });
};

// Update post
module.exports.update = function *(id) {
  var post = yield parse(this);
  yield posts.updateById(id, post);
  this.redirect('/post/' + id);
};

// Remove post
module.exports.remove = function *(id) {
  yield posts.remove({_id:id});
  this.redirect('/');
};