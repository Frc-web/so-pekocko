const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];  /* on récupère ce qu'il y a après bearer, après l'espace */
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');  /* on vérifie le token, on le décode */ 
    const userId = decodedToken.userId;  /* on récupère le user_id du token */
    if (req.body.userId && req.body.userId !== userId) {  /* si il y a un user_id dans la requête */
      throw 'Invalid user ID';  /* et si il est différent de celui du token */
    } else {
      next();  /* si tout va bien, on passe au prochain middleware */
    }
  } catch {  /* si il y a une erreur dans le try */
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};