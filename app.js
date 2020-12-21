const express = require("express");  /* pour importer Express */
const bodyParser = require("body-parser");  /* pour importer body-parser et transformer le format json */
const mongoose = require('mongoose');  /* Mongoose est un package qui facilite les interactions avec notre base de données MongoDB grâce à des fonctions extrêmement utiles. */
const path = require('path');

const sauceRoutes = require('./routes/sauce');  /* on importe le router */
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
    res.setHeader("Access-Control-Allow-Origin", "*");  
    res.setHeader(  
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );  
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    ); 
    next();
});

app.use(bodyParser.json());  

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauce', sauceRoutes);  
app.use('/api/auth', userRoutes);

module.exports = app;  
