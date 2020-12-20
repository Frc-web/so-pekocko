const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');  /* pour ne pas avoir pusieurs utlisateurs avec le même mail */

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },  /* unique pour qu'il ny ai pas 2 fois le même mot de passe */
  password: { type: String, required: true }  /* le mot de passe sera un hash de type string */
});

userSchema.plugin(uniqueValidator);  /* on applique uniqueValidator au shéma avant d'en faire un modèle */

module.exports = mongoose.model('User', userSchema);