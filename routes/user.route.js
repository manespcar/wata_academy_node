const {Router, response} = require('express');
const {mysqlConnection} = require('../config/config.db');

var router = new Router();

router.get('/', function (req, res = response) {
    mysqlConnection.query('SELECT * FROM users', (err, rows, fields) => {
        if (!err)
            res.status(200).send(rows);
        else
            console.log(err);
            res.status(500).json({
                msg: 'Upps! Something was wrong',
            });
        });
});

router.post('/', function (req, res = response) {
    res.status(201).json({
        msg: 'POST Users',
    });
});

module.exports = router;