const express = require('express');
const router = express.Router();
const controller = require('../controllers/postController');

router.get('/', controller.getPosts);
router.get('/:postId', controller.getPostById);
router.get('/:postId/comments', controller.getCommentsByPostId);

router.post('/', controller.createPost);
router.post('/:postId/comment', controller.createComment);

router.put('/:postId', controller.updatePost);

router.delete('/:postId', controller.deletePost);

module.exports = router;
