const router = require('express').Router();

const Post = require('../models/post');

router.get('/', async (req, res) => {
    const posts = await Post.find();
    res.status(200).send(posts);
});

router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.status(200).send(post);
});

router.post('/', async (req, res) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
    });
    const savePost = await post.save();
    res.status(201).send(savePost);
});

router.put('/:id', async (req, res) => {
    console.log(req.body);
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send(updatedPost);
});

router.delete('/:id', async (req, res) => {
    const post = await Post.findByIdAndDelete(req.params.id);
    res.status(200).send(post);
});

module.exports = router;
