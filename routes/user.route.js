const {Router, response} = require('express');

var router = new Router();

router.get('/', function (req, res) {
    res.send('Hello World users!');
});

router.post('/', function (req, res = response) {
    res.status(201).json({
        msg: 'POST Users',
    });
});

module.exports = router;