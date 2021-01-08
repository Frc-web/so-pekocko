const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const schemaPasswordValidator = require("../models/PasswordValidator");

exports.signup = (req, res, next) => {
    if (schemaPasswordValidator.validate(req.body.password)) {
        bcrypt
            .hash(req.body.password, 10)  /* 10 représente le salt, le nombre de tours que fait l'algorythme de hashage */
            .then(hash => {
                const user = new User({
                    email: req.body.email,
                    password: hash,
                });
                user
                    .save()
                    .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
                    .catch((error) => res.status(400).json({ error }));
            })
            .catch((error) => res.status(500).json({ error }));
    } else {
        return res.status(400).json({
            error: "Le mot de passe doit contenir au minimum huit caractères dont au moins une majuscules, une minuscules, un symbole, et au moins deux chiffres",
        });
    }
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({ error: "Utilisateur non trouvé !" });
            }
            bcrypt
                .compare(req.body.password, user.password)
                .then((valid) => {
                    if (!valid) {
                        return res.status(401).json({ error: "Mot de passe incorrect !" });
                    }
                    return res.status(200).json({
                        userId: user._id,  /* identifiant de l'utilisateur dans la base */
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.TOKEN,
                            { expiresIn: "24h" }
                        )
                    });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
};
