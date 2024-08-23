const prisma = require('../prisma/client');
const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const passport = require('passport');

exports.getAllPosts = asyncHandler(async (req, res) => {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
});

exports.getPostById = asyncHandler(async (req, res) => {
    const post = await prisma.post.findUnique({
        where: { id: Number(req.params.postId) },
        include: { comments: true },
    });
    res.status(200).json(post);
});

exports.getCommentsByPostId = asyncHandler(async (req, res) => {
    const comments = await prisma.comment.findMany({
        where: { postId: Number(req.params.postId) },
    });
    res.status(200).json(comments);
});

exports.createPost = passport.authenticate('jwt', { session: false }), asyncHandler(async (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[1];
    const decoded = jwt.verify(token, process.env.SECRET);

    if (!req.body.content || !req.body.title) {
        const err = new Error('Post is missing title and/or text content');
        err.statusCode = 400;
        return next(err);
    }

    const post = await prisma.post.create({
        data: {
            title: req.body.title,
            authorId: decoded.id,
            content: req.body.content,
        },
        include: {
            author: true,
        },
    });

    res.status(200).json(post);
});

exports.createComment = asyncHandler(async (req, res, next) => {
    if (!req.body.content.length) {
        const error = new Error('Comment must not be empty');
        error.statusCode = 400;
        return next(error);
    }

    const post = await prisma.post.findUnique({
        where: { id: Number(req.params.postId) },
    });
    if (!post) {
        const error = new Error(`Post of id ${req.params.postId} not found`);
        error.statusCode = 404;
        return next(error);
    }

    const comment = await prisma.comment.create({
        data: {
            content: req.body.content,
            author: req.body.author,
            postId: Number(req.params.postId),
        },
    });

    res.status(200).json(comment);
});

exports.updatePost = passport.authenticate('jwt', { session: false }), asyncHandler(async (req, res, next) => {
    const exists = await prisma.post.findUnique({
        where: { id: Number(req.params.postId) },
    });
    if (!exists) {
        const error = new Error(`Post of id ${req.params.postId} not found`);
        error.statusCode = 404;
        return next(error);
    }

    const post = await prisma.post.update({
        where: { id: Number(req.params.postId) },
        data: {
            title: req.body.title,
            subtitle: req.body.subtitle,
            content: req.body.content,
            updatedAt: new Date(),
        },
    });

    res.status(200).json(post);
});

exports.deletePost = passport.authenticate('jwt', { session: false }), asyncHandler(async (req, res, next) => {
    const exists = await prisma.post.findUnique({
        where: { id: Number(req.params.postId) },
    });
    if (!exists) {
        const error = new Error(`Post of id ${req.params.postId} not found`);
        error.statusCode = 404;
        return next(error);
    }

    await prisma.comment.deleteMany({
        where: { postId: Number(req.params.postId) },
    });
    const post = await prisma.post.delete({
        where: { id: Number(req.params.postId) },
    });

    res.status(200).json(post);
});
