const passwordValidator = require('password-validator');

const schemaPasswordValidator = new passwordValidator();

schemaPasswordValidator
    .is().min(8)                                         // Minimum de caractères 8
    .is().max(100)                                       // Maximum caractères 100
    .has().uppercase()                                   // Doit contenir des lettres majuscules
    .has().lowercase()                                   // Doit contenir des lettres minuscules
    .has().digits(2)                                     // Doit contenir deux chiffres
    .has().symbols()                                     /* Doit contenir des symboles */
    .has().not().spaces()                                // Ne doit pas contenir d'espaces
    .is().not().oneOf(['123Password@', 'Password123@']); // Blacklist de ces valeurs

module.exports = schemaPasswordValidator;  