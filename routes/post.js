const router = require('express').Router();
const multer = require('multer');

const Post = require('../models/post');
const imageStore = require('../util/imageUpload');

router.get('/', async (req, res) => {
    const posts = await Post.find();
    res.status(200).send(posts);
});

router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.status(200).send(post);
});

router.post(
    '/',
    multer({ storage: imageStore }).single('imageUrl'),
    async (req, res) => {
        const url = req.protocol + '://' + req.get('host');
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            imageUrl: url + '/images/' + req.file.filename,
        });
        const savePost = await post.save();
        res.status(201).send(savePost);
    }
);

router.put(
    '/:id',
    multer({ storage: imageStore }).single('imageUrl'),
    async (req, res) => {
        if (req.file) {
            const url = req.protocol + '://' + req.get('host');
            req.body.imageUrl = url + '/images/' + req.file.filename;
            console.log(req.body.imageUrl);
        }
        //console.log(req.body);
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        res.status(200).send(updatedPost);
    }
);

router.delete('/:id', async (req, res) => {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).send(post);
});

module.exports = router;
