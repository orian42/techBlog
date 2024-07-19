const User = require('./User');
const Blog = require('./Blog');
const Comment = require('./Comment');

//Relationship between User and Blog models
User.hasMany(Blog, {
  foreignKey: 'user_id',
});

Blog.belongsTo(User, {
  foreignKey: 'user_id',
});

//Relationship between Blog and Comment models
Blog.hasMany(Comment, {
  foreignKey: 'blog_id',
});

Comment.belongsTo(Blog, {
  foreignKey: 'blog_id',
});

//Relationship between User and Comment models
User.hasMany(Comment, {
  foreignKey: 'user_id',
});

Comment.belongsTo(User, {
  foreignKey: 'user_id',
});

module.exports = { User, Blog, Comment };
