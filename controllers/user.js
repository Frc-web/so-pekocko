const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)  /* pour hasher, crypter le mot de passe du corps de la requête 10 fois*/
      .then(hash => {  /* créé un nouveau user avec le mot de passe crypté */ 
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()  /* pour enregister dans la base de données */ 
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

  exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })  /* utilisateur de la base de données qui correspond à celui de la requête */
      .then(user => {
        if (!user) {  /* si on a pas trouvé de user dans la base de données */
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {  /* pour comparer le mot de passe de la requête avec celui du document user */
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({  /* ici ça retourne true */
              userId: user._id,  /* l'identifiant de l'utilisateur dans la base de données */
              token: jwt.sign(
                { userId: user._id },  /* les données que l'on veut encodées à l'atérieur de l'objet */
                'RANDOM_TOKEN_SECRET',  /* clé secrète pour l'encodage */
                { expiresIn: '24h' }  /* expiration de 24h pour notre token */
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };