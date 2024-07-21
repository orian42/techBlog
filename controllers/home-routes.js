const router = require('express').Router();
const { User, Blog, Comment } = require('../models');

// GET all blogs for homepage
router.get('/', async (req, res) => {
  const blogData = await Blog.findAll({
    include: [
      {
        model: User,
        attributes: ['username']
      },
    ]
  }).catch((err) => {
    res.json(err);
  });
  const blogs = blogData.map((blog) => blog.get({ plain: true }));
  res.render('homepage', { 
    blogs,
    loggedIn: req.session.loggedIn,
    currUserId: req.session.currentUserId });
});

// Get selected blog
router.get('/blog/:id', async (req, res) => {
  const singleBlogData = await Blog.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ['username']
      },
      {
        model: Comment,
        attributes: ['comment', 'created_at'],
        include: [
          {
            model: User,
            attributes: ['username']
          },
        ]
      },
    ]
  }).catch((err) => {
    res.json(err);
  });
  const singleBlog = singleBlogData.get({ plain: true });
  res.render('singleblog', { 
    singleBlog,
    loggedIn: req.session.loggedIn });
});

// GET all blogs for current user
router.get('/dash/:id', async (req, res) => {
  const blogData = await Blog.findAll({
    include: [
      {
        model: User,
        attributes: ['username']
      },
    ],
    where: {
      user_id: req.params.id
    }
  }).catch((err) => {
    res.json(err);
  });
  const blogs = blogData.map((blog) => blog.get({ plain: true }));
  res.render('dashboard', {
    blogs,
    loggedIn: req.session.loggedIn
  });
});

router.get('/newpost', async (req, res) => {
  res.render('newpost');
});

router.get('/login', async (req, res) => {
  res.render('login');
});

router.get('/signup', async (req, res) => {
  res.render('signup');
});

module.exports = router;