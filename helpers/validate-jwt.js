const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
    const token = req.header(process.env.XTOKEN);

    if(!token)
        return res.status(401).json({msg: 'Token does not exists'});

    try {
        jwt.verify(token, process.env.PRIVATEKEY);
        next();
    } catch (error) {
        return res.status(401).json({msg: 'Token is not valid'});
    }
}

module.exports = {validateJWT}