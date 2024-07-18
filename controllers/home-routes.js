const router = require('express').Router();
const { User, Blog } = require('../models');

// GET all blogs for homepage
router.get('/', async (req, res) => {
  try {
    const dbBlogData = await Blog.findAll({
          attributes: ['title', 'description'],
    });

    const blogs = dbBlogData.map((blog) =>
      blog.get({ plain: true })
    );

    res.render('homepage', blogs);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;