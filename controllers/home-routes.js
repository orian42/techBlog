const router = require('express').Router();
const { User, Blog } = require('../models');

// GET all blogs for homepage
router.get('/', async (req, res) => {
  const blogData = await Blog.findAll().catch((err) => {
    res.json(err);
  });
  const blogs = blogData.map((blog) => blog.get({ plain: true }));
  res.render('homepage', { blogs });
});

// GET all blogs for current user
router.get('/dash/:id', async (req, res) => {
  const blogData = await Blog.findAll({
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

router.get('/login', async (req, res) => {
  res.render('login');
});

router.get('/signup', async (req, res) => {
  res.render('signup');
});

module.exports = router;