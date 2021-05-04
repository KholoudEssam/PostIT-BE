const router = require('express').Router();
const multer = require('multer');

const auth = require('../middlewares/auth');
const imgUpload = require('../middlewares/imageUpload');

const {
    getPost,
    getPosts,
    createPost,
    updatePost,
    deletePost,
} = require('../controllers/post');

router.get('/', getPosts);

router.get('/:id', getPost);

router.post('/', auth, imgUpload, createPost);

router.put('/:id', auth, imgUpload, updatePost);

router.delete('/:id', auth, deletePost);

module.exports = router;
