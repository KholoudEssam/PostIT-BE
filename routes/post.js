const router = require('express').Router();
const multer = require('multer');

const auth = require('../middlewares/auth');
const Post = require('../models/post');
const imageStore = require('../util/imageUpload');

router.get('/', async (req, res) => {
    const pagesize = +req.query.pagesize;
    const currentpage = +req.query.currentpage;
    const postsCount = await Post.countDocuments();
    const postQuery = Post.find();
    if (pagesize && currentpage) {
        postQuery.skip(pagesize * (currentpage - 1)).limit(pagesize);
    }
    const posts = await postQuery;
    res.status(200).send({ posts, postsCount });
});

router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.status(200).send(post);
});

router.post(
    '/',
    auth,
    multer({ storage: imageStore }).single('imageUrl'),
    async (req, res) => {
        const url = req.protocol + '://' + req.get('host');
        const post = new Post({
            title: req.body.title,
            content: req.body.content,
            imageUrl: url + '/images/' + req.file.filename,
            creatorId: req.userId,
        });
        const savePost = await post.save();
        res.status(201).send(savePost);
    }
);

router.put(
    '/:id',
    auth,
    multer({ storage: imageStore }).single('imageUrl'),
    async (req, res) => {
        if (req.file) {
            const url = req.protocol + '://' + req.get('host');
            req.body.imageUrl = url + '/images/' + req.file.filename;
            console.log(req.body.imageUrl);
        }

        let updatedPost = await Post.findById(req.params.id);

        updatedPost = await Post.updateOne(
            { _id: req.params.id, creatorId: req.userId },
            req.body
        );
        res.status(200).send({});
    }
);

router.delete('/:id', auth, async (req, res) => {
    const post = await Post.deleteOne({
        _id: req.params.id,
        creatorId: req.userId,
    });

    if (!post.deletedCount)
        return res.status(401).send({ msg: 'unauthorized to delete' });
    res.status(200).send({});
});

module.exports = router;
