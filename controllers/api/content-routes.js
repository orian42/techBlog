const router = require('express').Router();
const { Comment } = require('../../models');

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



module.exports = router;