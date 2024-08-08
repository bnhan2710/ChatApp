const router = require('express').Router();

router.get('/chat', (req, res) => {
    res.render('chat.pug')
})

module.exports = router;