require('dotenv').config();
const prisma = require('../prisma/client');
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require("express-validator");

exports.userGet = asyncHandler(async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1]
    const decoded = jwt.verify(token, process.env.SECRET)

    const user = await prisma.user.findUnique({where: {id: decoded.id}, include: {password: false}})

    res.status(200).send(user)
})

exports.userRegisterPost = [
    body('name')
        .trim()
        .isLength({ min: 3, max: 30 })
        .withMessage('Username must be between 3 and 30 characters')
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage('Username can only contain alphanumeric characters and underscores')
        .custom(async (value) => {
            const lowerCaseName = value.toLowerCase();
            const user = await prisma.user.findFirst({
                where: { name: { equals: lowerCaseName, mode: 'insensitive' } }
            });

            if (user) {
                throw new Error(`Username '${value}' already in use. Please try a different one.`);
            }
        }),

    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long'),

    body('secret')
        .equals(process.env.REGISTER_SECRET)
        .withMessage('Secret word is invalid'),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            bcrypt.hash(req.body.password, 10, async(err, hashedPass) => {
                if (err) {
                    return next(err)
                }
        
                await prisma.user.create({
                    data: {
                        name: req.body.name,
                        password: hashedPass,
                    },
                })
                return res.status(200).json({message: 'User created successfully', name: req.body.name})
            })
        } else {
            const messages = errors.array().map(e => e.msg);

            return res.status(400).json({
                errors: {
                    messages,
                    statusCode: 400
                }
            });
        }
    })
];

exports.userLoginPost = [
    body('name').custom(async (value) => {
        const user = await prisma.user.findFirst({where: {name: value}})
        if (!user) {
            throw new Error('User not found')
        }
    }),

    body('password').custom(async (value, {req}) => {
        const user = await prisma.user.findFirst({where: {name: req.body.name}})

        const match = await bcrypt.compare(value, user.password);
        if (!match) {
            throw new Error('Invalid password')
        }
    }),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const user = await prisma.user.findFirst({where: {name: req.body.name}, include: {password: false}})
            const token = jwt.sign({id: user.id}, process.env.SECRET, { expiresIn: '3d' })
            // Generates token for logged in users
            // To register in the first place you need a secret key, so this is (i think) not a problem
        
            return res.status(200).json({
                message: 'Logged in successfully! Token expires in 3 days', 
                token,
                user
            })
        } else {
            return res.status(400).json({
                errors: {
                    messages: [errors.array()[0].msg],
                    statusCode: 400
                }
            });
        }
    })
];
