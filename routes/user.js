const express = require('express');
const router = express.Router();
const prisma = require('../prisma/client');
const asyncHandler = require('express-async-handler')

router.get('/', asyncHandler(async (req, res) => {
    // Should return the logged in user's data
    const user = await prisma.user.findUnique({where: {id: 1}})
    res.json(user)
}))

router.post('/', asyncHandler(async (req, res) => {
    // Create a new user in database with data given by client
    // Obviously password will be cryptographed later don't worry about it
    const user = await prisma.user.create({
        data: {
            name: req.body.name,
            password: req.body.password
        }
    })

    res.json(user)
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