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
  res.render('homepage', { blogs });
});

// Get selected blog
router.get('/:id', async (req, res) => {
  const blogData = await Blog.findByPk(req.params.id, {
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
  const singleBlog = blogData.get({ plain: true });
  console.log(singleBlog);
  res.render('singleblog', { singleBlog });
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

router.get('/login', async (req, res) => {
  res.render('login');
});

router.get('/signup', async (req, res) => {
  res.render('signup');
});

module.exports = router;