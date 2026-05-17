const express = require('express')
const router = express.Router()

//define home page route
router.get('/',(req,res)=>{
    res.send('blog home page')
})
//define about route
router.get('/about',(req,res)=>{
    res.send('blog about page')
})

module.exports = router