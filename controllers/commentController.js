const prisma = require('../prisma/client');
const asyncHandler = require('express-async-handler');
const passport = require('passport');
const { body, param, validationResult } = require('express-validator');

exports.getAllComments = asyncHandler(async (req, res) => {
    const { page, limit, filter, sort = 'asc' } = req.query;

    const comments = await prisma.comment.findMany({
        skip: (page - 1) * limit || undefined,
        take: Number(limit) || undefined,
        orderBy: {
            updatedAt: sort
        },
        where: {
            content: { contains: filter }
        }
    });

    res.status(200).json(comments);
});

exports.getCommentById = asyncHandler(async (req, res) => {
    const comment = await prisma.comment.findUnique({
        where: { id: Number(req.params.commentId) },
    });
    res.status(200).json(comment);
});

exports.updateComment = [
    body('content').trim().isLength({min: 1}).withMessage('Comment must not be empty'),
    param('commentId').custom(async (value, {req}) => {
        const exists = await prisma.comment.findUnique({
            where: { id: Number(value) },
        });

        if (!exists) {
            throw new Error(`Comment of id ${req.params.commentId} not found`);
        }
    }),

    passport.authenticate('jwt', { session: false }), asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            const comment = await prisma.comment.update({
                where: { id: Number(req.params.commentId) },
                data: {
                    content: req.body.content,
                    updatedAt: new Date(),
                },
            });
        
            res.status(200).json(comment);
        } else {
            const messages = [];
            for (e in errors.array()) {
                messages.push(errors.array()[e].msg)
            }

            return res.status(400).json({
                errors: {
                    messages,
                    statusCode: 400
                }
            })
        }
    })
]


exports.deleteComment = [
    param('commentId').custom(async (value, {req}) => {
        const exists = await prisma.comment.findUnique({
            where: { id: Number(value) },
        });

        if (!exists) {
            throw new Error(`Comment of id ${req.params.commentId} not found`);
        }
    }),

    passport.authenticate('jwt', { session: false }), asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        if (errors.isEmpty()) {
            const comment = await prisma.comment.delete({
                where: { id: Number(req.params.commentId) },
            });
        
            res.status(200).json(comment);
        } else {
            return res.status(400).json({
                error: {
                    message: errors.array()[0].msg,
                    statusCode: 400
                }
            })
        }
    })
];

