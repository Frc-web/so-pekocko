const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true },
  /* l'identifiant est généré automatiquement par MongoDB */
});

module.exports = mongoose.model('Sauce', sauceSchema);  /* on exporte ce schéma en tant que modèle Mongoose appelé « Thing », le rendant par là même disponible pour notre application Express */
