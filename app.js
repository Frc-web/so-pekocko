const express = require("express");  /* pour importer Express */
const bodyParser = require("body-parser");  /* pour importer body-parser et transformer le format json */
const mongoose = require('mongoose');  /* Mongoose est un package qui facilite les interactions avec notre base de données MongoDB grâce à des fonctions extrêmement utiles. */
const path = require('path');

const stuffRoutes = require('./routes/stuff');  /* on importe le router */
const userRoutes = require('./routes/user');

mongoose.connect('mongodb+srv://Frc-web:Todayfred30@cluster0.lcfyu.mongodb.net/be-fullstack?retryWrites=true&w=majority',
{
    useNewUrlParser: true,  /* pour se connecter à MongoDB */
    useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();  /* on appelle la méthode express, cela permet de créer une application Express */

app.use((req, res, next) => {  /* les headers servent à pouvoir commnunique entre localhost3000 et 4200 malgrès le CORS */
    res.setHeader("Access-Control-Allow-Origin", "*");  /* d'accéder à notre API depuis n'importe quelle origine ( '*' ) */
    res.setHeader(  
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );  /* on donne l'autorisation d'utiliser certains en-têtes, certains headers */
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    );  /* et certaines méthodes */
    next();
});

app.use(bodyParser.json());  /* transforme le corps de la requête en objet javascript utilisable, .use pour correspondre à toutes les routes) */

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/stuff', stuffRoutes);  /* pour cette route, on utilise le routeur stuffRoutes */
app.use('/api/auth', userRoutes);

module.exports = app;  /* pour exporter l'application notre application Express pour pouvoir y accèder depuis les autres fichiers de notre projet */
