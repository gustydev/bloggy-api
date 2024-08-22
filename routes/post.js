const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('GET request for all posts')
})

router.get('/:postId', (req, res) => {
    res.send(`GET request for post of id ${req.params.id}`)
})

router.post('/', (req, res) => {
    res.send('POST request for post')
})

router.put('/:postId', (req, res) => {
    res.send(`PUT request for post id ${req.params.id}`)
})

router.delete('/:postId', (req, res) => {
    res.send(`DELETE request for post id ${req.params.id}`)
})

module.exports = router;