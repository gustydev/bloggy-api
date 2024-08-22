const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client')
const asyncHandler = require('express-async-handler');

router.get('/', asyncHandler(async (req, res) => { // Get all comments
    const comments = await prisma.comment.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    res.json(comments)
}))

router.get('/:commentId', asyncHandler(async(req, res) => {
    const comment = await prisma.comment.findUnique({where: {id: Number(req.params.commentId)}})

    res.json(comment)
}))

router.put('/:commentId', asyncHandler(async(req, res) => {
    const comment = await prisma.comment.update({
        where: {id: Number(req.params.commentId)},
        data: {
            content: req.body.content,
            updatedAt: new Date()
        }
    })
    
    res.json(comment)
}))

router.delete('/:commentId', asyncHandler(async(req, res) => {
    const comment = await prisma.comment.delete({where: {id: Number(req.params.commentId)}})
    
    res.json(comment)
}))

module.exports = router;