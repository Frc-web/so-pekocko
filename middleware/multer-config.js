const multer = require('multer');

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images');   /* null pour dire qu'il n'y a pas eu d'erreur */
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];   /* l'élément de notre dictionnaire qui correspond au mime_types envoyé par le frontend */
        callback(null, name + Date.now() + '.' + extension);  /* Date.now = timestamp  */
    }
});

module.exports = multer({ storage: storage }).single('image');  /* single pour fichier unique */