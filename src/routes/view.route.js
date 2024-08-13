const router = require('express').Router();

router.get('/chat', (req, res) => {
    res.render('chat.pug')
})

router.get('/auth', (req,res) => {
    res.render('auth.pug')
})  

router.get('/video-call' ,(req,res) => {
    res.render('videocall.pug')
})
module.exports = router;