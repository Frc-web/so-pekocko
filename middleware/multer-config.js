const multer = require('multer');

const MIME_TYPES = {  /* dictionnaire */
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({  /* on dit qu'on va l'enregister sur le disque */
  destination: (req, file, callback) => {  /* explique à multer dans quel dossier enregistrer les fichiers*/
    callback(null, 'images');  /* appeler le callback et dire qu'il n'y a pas eu d'erreur, puis le nom du dossier */
  },
  filename: (req, file, callback) => {  /* quel nom de fichier utiliser. On ne peut pas utiliser le nom d'origine */
    const name = file.originalname.split(' ').join('_');  /* nom d'origine sans les espaces, remplacé par des underscores */
    const extension = MIME_TYPES[file.mimetype];  /* génère l'extension du fichier */
    callback(null, name + Date.now() + '.' + extension);  /* on ajoute un un timestamp(Date.now) pour qu'il soit unique */
  }
});

module.exports = multer({storage: storage}).single('image');  /* single pour objet unique */