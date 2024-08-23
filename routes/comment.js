const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client')
const asyncHandler = require('express-async-handler');
const passport = require('passport');

router.get('/', asyncHandler(async (req, res) => { 
    // Get all comments
    const comments = await prisma.comment.findMany({
        orderBy: {
            createdAt: 'desc'
        }
    });

    res.status(200).json(comments)
}))

router.get('/:commentId', asyncHandler(async(req, res) => {
    const comment = await prisma.comment.findUnique({where: {id: Number(req.params.commentId)}})

    res.status(200).json(comment)
}))

router.put('/:commentId', passport.authenticate('jwt', { session: false }), asyncHandler(async(req, res) => {
    const exists = await prisma.comment.findUnique({where: {id: Number(req.params.commentId)}});
    if (!exists) {
        const error = new Error(`Comment of id ${req.params.commentId} not found`)
        error.statusCode = 404;
        return next(error)
    }

    const comment = await prisma.comment.update({
        where: {id: Number(req.params.commentId)},
        data: {
            content: req.body.content,
            updatedAt: new Date()
        }
    })
    
    res.status(200).json(comment)
}))

router.delete('/:commentId', passport.authenticate('jwt', { session: false }), asyncHandler(async(req, res) => {
    const exists = await prisma.comment.findUnique({where: {id: Number(req.params.commentId)}});
    if (!exists) {
        const error = new Error(`Comment of id ${req.params.commentId} not found`)
        error.statusCode = 404;
        return next(error)
    }
    
    const comment = await prisma.comment.delete({where: {id: Number(req.params.commentId)}})
    
    res.status(200).json(comment)
}))

module.exports = router;