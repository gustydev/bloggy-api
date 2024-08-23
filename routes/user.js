const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/', asyncHandler(async (req, res) => {
    // const user = await prisma.user.findFirst({where: {name: req.body.name}})
    // if (!user) {
    //     res.status(400).json({message: 'User not found'})
    // }

    // res.status(200).json(user)
    console.log(req.headers)
    res.send(req.user)
}))

router.post('/register', asyncHandler(async (req, res) => {
    // Create a new user in database with data given by client
    bcrypt.hash(req.body.password, 10, async(err, hashedPass) => {
        if (err) {
            return next(err)
        }

        const user = await prisma.user.create({
            data: {
                name: req.body.name,
                password: hashedPass,
            },
        });
        res.json(user)
    })
}))

router.post('/login', asyncHandler(async (req, res) => {
    const user = await prisma.user.findFirst({where: {name: req.body.name}})
    if (!user) {
        res.status(400).json({message: 'user not found'})
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
        res.status(400).json({message: 'password is invalid'})
    }

    const token = jwt.sign({id: user.id}, process.env.SECRET)
    // Generates token for any registered user, meaning any user can create posts with a token
    // Later change so only admins (assigned users) have tokens

    res.status(200).json({message: 'logged in successfully', token, user})
}))

router.put('/', (req, res) => {
    // Update user info
    res.send('User PUT')
})

router.delete('/', (req, res) => {
    // Delete user
    res.send('User DELET')
})

module.exports = router;