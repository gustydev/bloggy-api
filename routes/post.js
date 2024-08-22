const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const asyncHandler = require('express-async-handler')

router.get('/', asyncHandler(async (req, res) => {
    // Get all posts
    const posts = await prisma.post.findMany();

    res.json(posts)
}))

router.get('/:postId', asyncHandler(async (req, res) => {
    // Get specific post by id
    const post = await prisma.post.findUnique({where: {id: Number(req.params.postId)}, include: {comments: true}})

    res.json(post)
}))

router.get('/:postId/comment', asyncHandler(async (req, res) => {
    // Get comments of specific post by its id
    const comments = await prisma.comment.findMany({where: {postId: Number(req.params.postId)}});

    res.json(comments);
}));

router.post('/', asyncHandler(async (req, res) => {
    // Create post with data sent by client
    const post = await prisma.post.create({
        data: {
            title: req.body.title,
            authorId: 1, // Id of logged user
            content: req.body.content
        },
        include: {
            author: true
        }
    })

    res.json(post)
}))

router.post('/:postId/comment', asyncHandler(async (req, res) => {
    // Create comment under post
    const comment = await prisma.comment.create({
        data: {
            content: req.body.content,
            author: req.body.author,
            postId: Number(req.params.postId)
        }
    })

    res.json(comment);
}));

router.put('/:postId', asyncHandler(async(req, res) => {
    const post = await prisma.post.update({
        where: {id: Number(req.params.postId)},
        data: {
            title: req.body.title,
            subtitle: req.body.subtitle,
            content: req.body.content,
            updatedAt: new Date()
        }
    });

    res.json(post);
}))

router.delete('/:postId', asyncHandler(async (req, res) => {
    await prisma.comment.deleteMany({where: {postId: Number(req.params.postId)}});
    const post = await prisma.post.delete({where: {id: Number(req.params.postId)}})

    res.json(post)
}))

module.exports = router;