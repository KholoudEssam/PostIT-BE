const multer = require('multer');

const MIIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
};

const imageStore = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIIME_TYPE_MAP[file.mimetype];
        let err = new Error('Invalid MIMETYPE');
        if (isValid) err = null;
        cb(err, 'public/images');
    },
    filename: (req, file, cb) => {
        //const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MIIME_TYPE_MAP[file.mimetype];
        cb(null, `photo-${Date.now()}.${ext}`);
    },
});

module.exports = imageStore;
