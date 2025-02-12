// Middleware to validate user email
module.exports = (req, res, next) => {
    if (!req.user.email.endsWith('@gmail.com')) {
        return res.status(403).json({ error: 'User email must end with @gmail.com' });
    }
    next();
};
