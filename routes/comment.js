const express = require('express');
const router = express.Router();

router.get('/', (req, res) => { // Get all comments
    // Should add function to sort comments by date (most recent)
    res.send('GET all comments')
})

router.get('/:commentId', (req, res) => {
    res.send(`GET comment of ID ${req.params.commentId}`)
})

router.post('/', (req, res) => {
    res.send(`Message: ${req.body.text}`)
})

router.put('/:commentId', (req, res) => {
    res.send(`PUT comment of id ${req.params.commentId}`)
})

router.delete('/:commentId', (req, res) => {
    res.send(`DELETE comment of id ${req.params.commentId}`)
})

module.exports = router;