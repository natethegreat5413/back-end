const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        const secret = process.env.JWT_SECRET || '1000island';

        jwt.verify(token, secret, (error, decodedToken) => {
            if (error) {
                res.status(401).json({
                    message: 'You do not have access',
                });
            } else {
                req.jwt = decodedToken;
                res.header('Access-Control-Allow-Origin', '*');
                next();
            }
        });
    } else {
        res.status(400).json({
            message: 'Please provide authentication information',
        });
    }
};
