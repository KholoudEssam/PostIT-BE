const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, 'secret 1234');

        next();
    } catch (error) {
        res.status(401).json({ msg: 'invalid token' });
    }
};

module.exports = auth;
