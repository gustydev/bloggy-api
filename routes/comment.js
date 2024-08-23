const express = require('express');
const router = express.Router();
const controller = require('../controllers/commentController');

router.get('/', controller.getAllComments);
router.get('/:commentId', controller.getCommentById);

router.put('/:commentId', controller.updateComment);

router.delete('/:commentId', controller.deleteComment);

module.exports = router;
