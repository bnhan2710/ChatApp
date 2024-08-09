const router = require('express').Router();

router.get('/chat', (req, res) => {
    res.render('chat.pug')
})

router.get('/auth', (req,res) => {
    res.render('auth.pug')
})  

module.exports = router;