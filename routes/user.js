const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/', asyncHandler(async (req, res) => {
    const token = req.headers['authorization'].split(' ')[1]
    const decoded = jwt.verify(token, process.env.SECRET)

    const user = await prisma.user.findUnique({where: {id: decoded.id}, include: {password: false}})

    res.status(200).send(user)
}))

router.post('/register', asyncHandler(async (req, res, next) => {
    // Check if user is not duplicate
    const userExists = await prisma.user.findFirst({where: {name: req.body.name}})
    if (userExists) {
        const error = new Error('Username already taken')
        error.statusCode = 400
        return next(error)
    }

    // If not, create a new user in database with data given by client
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
        return res.status(200).json({message: 'user created successfully', name: req.body.name})
    })
}))

router.post('/login', asyncHandler(async (req, res, next) => {
    const user = await prisma.user.findFirst({where: {name: req.body.name}})
    if (!user) {
        const error = new Error('User not found')
        error.statusCode = 404;
        return next(error)
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
        const error = new Error('Invalid password')
        error.statusCode = 400;
        return next(error)
    }

    const token = jwt.sign({id: user.id}, process.env.SECRET, { expiresIn: '3d' })
    // Generates token for any registered user, meaning any user can create posts with a token
    // Later change so only admins (assigned users) have tokens

    return res.status(200).json({message: 'logged in successfully', token})
}))

module.exports = router;