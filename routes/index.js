const express = require('express');
const res = require("express/lib/response");
const req = require("express/lib/request");
const router = express.Router();

let counter = 0;

/* GET home page. */
router.get('/count', function(req, res, next) {
  res.render('index', { title: 'Express API' });
});

/*GET current count */
router.get('/count',
    function (req, res) {
      res.send(`Current count: ${counter}`);
})

/*POST counter */
router.post('/increment',
    function (req, res) {
     counter++
     res.send(`Updated count: ${counter}`)
})

router.post('/increment:amount',
    function (req, res) {
    counter++
    res.send(`Updated count: ${counter}`)
})

module.exports = router;
