const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('User GET')
})

router.post('/', (req, res) => {
    res.send('User POST')
})

router.put('/', (req, res) => {
    res.send('User PUT')
})

router.delete('/', (req, res) => {
    res.send('User DELET')
})

module.exports = router;