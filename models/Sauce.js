const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({
    userId: { type: String, required: true },
    name: { type: String, required: true },
    manufacturer: { type: String, required: true },
    description: { type: String, required: true },
    mainPepper: { type: String, required: true },
    imageUrl: { type: String, required: true },
    heat: { type: Number, required: true },  /* nombre entre 1 et 10 décrivant la sauce */
    likes: { type: Number, default: 0},
    dislikes: { type: Number, default: 0 },
    usersLiked: { type: [String], default: [] },  /* tableau d'identifiants d'utilisateurs ayant aimé la sauce  */
    usersDisliked: { type: [String], default: [] }
});

module.exports = mongoose.model('Sauce', sauceSchema);  