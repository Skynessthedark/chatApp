var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  if(!req.user){
    res.render('index');
  }
  else{
    res.redirect('/chat');
  }
});

/* GET users */
router.get('/getUser', (req, res, next) => {
  if(!req.user){
    res.render('index');
  }
  else{
    res.redirect('/chat');
  }
});

module.exports = router;
