const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {  /* pour vérifier l'autorisation */
    try {
        const token = req.headers.authorization.split(' ')[1];  /* renvoi un tableau avec les 2 éléments (bearer et le token) */
        const decodedToken = jwt.verify(token, process.env.TOKEN); /* pour décoder le token */
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
}; 