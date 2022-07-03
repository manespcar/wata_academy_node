const jwt = require('jsonwebtoken');

const generateJWT = (id = '') => {
    return new Promise( (resolve, reject) => {
        const payload = {id};

        jwt.sign(payload, process.env.PRIVATEKEY, {
            expiresIn: '4h'
        }, (err, token) => {
            if(err)
                reject('Fail with generate token');
            else
                resolve(token);
        });
    });
}

module.exports = {generateJWT}