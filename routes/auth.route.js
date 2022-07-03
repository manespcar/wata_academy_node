const { Router, response } = require('express');
const { check, validationResult } = require('express-validator');
const { generateJWT } = require('../helpers/generate-jwt');
const UserRepository = require('../repository/user.repository');

var router = new Router();

router.post('/login', 
    [
        check('email', 'Email is not valid').isEmail(),
        check('password', 'The password is mandatory').notEmpty(),
    ],
    function (req, res = response) {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            res.status(400).json(errors);
        } else {
            const {email, password} = req.body;

            const userRepository = new UserRepository();
            userRepository.isRegistered(email, password, async (result, error) => {
                if(!error && result){
                    const token = await generateJWT(result);
                    res.status(200).json({token: token});
                }
                else if(!error && result == -1)
                    res.status(403).json({msg: 'User not registered'});
                else 
                    res.status(500).json({
                        msg: 'Upps! Something was wrong',
                        error: error
                    });
            });
        }
});

module.exports = router;