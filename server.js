const http = require("http"); /* importe le package http de Node */
const app = require("./app"); /* importe notre application */

const normalizePort = (val) => {
    /* la fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme_ */
    const port = parseInt(
        val,
        10
    ); /* d'un numéro ou d'une chaîne. parseInt transforme un string en entier,(base de 10) */
    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || "3000");
app.set(
    "port",
    port
); /* on dit à l'application Express sur quel port elle va tourner */

const errorHandler = (error) => {
    /* la fonction errorHandler recherche les différentes erreurs et les gère de manière_ */
    if (error.syscall !== "listen") {
        /* appropriée. Elle est ensuite enregistrée dans le serveur */
        throw error;
    }
    const address = server.address();
    const bind =
        typeof address === "string" ? "pipe " + address : "port: " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges.");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use.");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const server = http.createServer(
    app
); /* créé un serveur avec la méthode createServer du package http, elle prend comme argument la fonction app (notre application), qui sera appelée à chaque requête reçu par le serveur.*/

server.on("error", errorHandler);
server.on("listening", () => {
    /* un écouteur d'évènements est également enregistré, consignant le port ou le canal_ */
    const address = server.address(); /* nommé sur lequel le serveur s'exécute dans la console */
    const bind = typeof address === "string" ? "pipe " + address : "port " + port;
    console.log("Listening on " + bind);
});

server.listen(
    process.env.PORT || 3000
); /* le serveur écoute, attend les requêtes envoyées, sur le port par défaut de l'environnement ou le port 3000 */
