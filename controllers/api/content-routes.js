const router = require('express').Router();
const { Comment, Blog } = require('../../models');

// Create new comment
router.post('/c', async (req, res) => {
    try {
        const dbCommentData = await Comment.create({
            comment: req.body.comment,
            blog_id: req.body.blog_id,
            user_id: req.session.currentUserId
        });

        res.status(200).json(dbCommentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Create new blog post
router.post('/b', async (req, res) => {
    try {
        const dbNewPostData = await Blog.create({
            title: req.body.title,
            description: req.body.content,
            user_id: req.session.currentUserId
        });

        res.status(200).json(dbNewPostData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Update existing blog post
router.put('/u', async (req, res) => {
    try {
        const dbUpdatePostData = await Blog.update({
            title: req.body.title,
            description: req.body.content
        },
            {
                where: {
                    id: req.session.req.body.blog_id
                }
            }
        );

        if (dbUpdatePostData[0] === 0) { // Check if any rows were updated
            res.status(404).json({ message: 'No blog post found with this user id!' });
        } else {
            res.status(200).json(dbUpdatePostData);
        }

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;