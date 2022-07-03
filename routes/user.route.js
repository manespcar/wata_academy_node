const { Router, response } = require('express');
const { check, validationResult } = require('express-validator');
const UserService = require('../services/user.service');

var router = new Router();

router.get('/', function (req, res = response) {
    const userService = new UserService();
    userService.getUsers((result, error) => 
    {
        if(!error) 
            res.status(200).send(result);
        else 
            res.status(500).json({
                msg: 'Upps! Something was wrong',
            });
    });
});

router.get('/:id', function (req, res = response) {
    const userService = new UserService();
    userService.getUserById(req.params.id, (result, error) => {
        if(error) {
            res.status(500).json({
                msg: 'Upps! Something was wrong',
            });
        }
        else if(!error && result.length > 0) {
            res.status(200).send(result[0]);
        } else {
            res.status(404).json({msg:'User NOT FOUND'});
        }
    });
});

router.post('/', 
    [
        check('email', 'Email is not valid').isEmail(),
        check('email', 'The email is too long, max-length 45').isLength({max: 45}),
        check('username', 'The username is mandatory').notEmpty(),
        check('username', 'The username is too long, max-length 45').isLength({max: 45}),
        check('phone', 'The phone is too long, max-length 45').isLength({max: 45})
    ],
    function (req, res = response) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).json(errors);
        } else {
            const userService = new UserService();
            userService.saveUser(req.body, (result, error) => {
                if(!error)
                    res.status(201).json({
                        msg: 'User created',
                        userId: result
                    });
                else 
                    res.status(500).json({
                        msg: 'Upps! Something was wrong',
                        error: error
                    });
            });
        }
});

router.put('/:id', 
    [
        check('email', 'Email is not valid').isEmail(),
        check('email', 'The email is too long, max-length 45').isLength({max: 45}),
        check('username', 'The username is mandatory').notEmpty(),
        check('username', 'The username is too long, max-length 45').isLength({max: 45}),
        check('phone', 'The phone is too long, max-length 45').isLength({max: 45})
    ],
    function (req, res = response) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).json(errors);
        } else {
            const userService = new UserService();
            userService.updateUser(req.params.id, req.body, (result, err) => {
                if(err && err == 'EMAIL_DUPLICATED')
                    res.status(409).json({
                        msg: 'There is a user with the same email'
                    });
                else if(!err) 
                    res.status(200).json({
                        msg: 'User updated'
                    });
                else
                    res.status(500).json({
                        msg: 'Upps! Something was wrong',
                        error: err
                    });
            });
        }
});

router.delete('/:id', function (req, res = response) {
    const userService = new UserService();
    userService.deleteUser(req.params.id, (result, error) => 
    {
        if(!error)
            res.status(200).json({msg: 'The user has been deleted'});
        else 
            res.status(500).json({
                msg: 'Upps! Something was wrong',
            });
    });
});

module.exports = router;