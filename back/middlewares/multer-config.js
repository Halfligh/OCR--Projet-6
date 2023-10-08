const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  // Fonction indiquant d'enregistrer dans le dossier images
  destination: (req, file, callback) => {
    callback(null, 'images');
  },

  // Fonction formattant le nom des fichiers
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

// Export de notre élément + paramétrage ajout d'image uniquement
module.exports = multer({storage: storage}).single('image');