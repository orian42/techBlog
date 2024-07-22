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
    currUserId: req.session.currentUserId
  });
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
        ],
      },
    ],
    order: [
      [{ model: Comment }, 'created_at', 'ASC']
    ]
  }).catch((err) => {
    res.json(err);
  });
  const singleBlog = singleBlogData.get({ plain: true });
  res.render('singleblog', {
    singleBlog,
    loggedIn: req.session.loggedIn,
    currUserId: req.session.currentUserId
  });
});

// GET all blogs for current user
router.get('/dash/', async (req, res) => {
  const blogData = await Blog.findAll({
    include: [
      {
        model: User,
        attributes: ['username']
      },
    ],
    where: {
      user_id: req.session.currentUserId ? req.session.currentUserId : 0
    }
  }).catch((err) => {
    res.json(err);
  });
  const blogs = blogData.map((blog) => blog.get({ plain: true }));
  res.render('dashboard', {
    blogs,
    loggedIn: req.session.loggedIn,
    currUserId: req.session.currentUserId
  });
});

// Get selected blog for updating
router.get('/update/:id', async (req, res) => {
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
        ],
      },
    ],
    order: [
      [{ model: Comment }, 'created_at', 'ASC']
    ]
  }).catch((err) => {
    res.json(err);
  });
  const singleBlog = singleBlogData.get({ plain: true });
  res.render('updateDelete', {
    singleBlog,
    loggedIn: req.session.loggedIn,
    currUserId: req.session.currentUserId
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