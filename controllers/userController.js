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
    body('name').custom(async (value) => {
        // Check if user already exists
        const user = await prisma.user.findFirst({where: {name: value}});
        if (user) {
            throw new Error(`Username '${value}' already in use. Please try a different one.`)
        }
    }),

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
            return res.status(400).json({
                error: {
                    message: errors.array()[0].msg,
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
        console.log(value, user)
        const match = await bcrypt.compare(value, user.password);
        if (!match) {
            throw new Error('Invalid password')
        }
    }),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const user = await prisma.user.findFirst({where: {name: req.body.name}})
            const token = jwt.sign({id: user.id}, process.env.SECRET, { expiresIn: '3d' })
            // Generates token for any registered user, meaning any user can create posts with a token
            // Later change so only admins (assigned users) have tokens
        
            return res.status(200).json({message: 'Logged in successfully! Token expires in 3 days', token})
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
