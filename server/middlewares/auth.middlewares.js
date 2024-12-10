const jwt = require('jsonwebtoken');

module.exports.authMiddleware = function(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Authorization token missing' });
    }

    try {
        const jwtToken = token.replace('Bearer ', '').trim();
        const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error verifying the token', error.message);
        return res.status(401).json({ message: 'Unauthorized - Invalid token' });
    }
}
