// Middleware to validate task text length
module.exports = (req, res, next) => {
    const { text } = req.body;
    if (text && text.length > 140) {
        return res.status(400).json({ error: 'Task exceeds 140 character limit' });
    }
    next();
};
