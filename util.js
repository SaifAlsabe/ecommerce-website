jwt = require('jsonwebtoken');
dotenv = require('dotenv');

dotenv.config();

const getToken = (user) => {
    return jwt.sign({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET, { expiresIn: '48h' })
}

const isAuth = (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        const onlyToken = token.split(' ')[1];
        jwt.verify(onlyToken, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                res.status(401).send({ message: 'Invalid Token' });
            } else {
                req.user = decode;
                next();
            }
        });

    } else {
        return res.status(401).send({ message: 'Token is not supplied.' });
    }
};

const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401).send({ message: 'Admin Token is not valid.' });
    }

};

module.exports = { getToken, isAuth, isAdmin };